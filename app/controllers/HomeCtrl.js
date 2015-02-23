(function() {
angular.module('myApp').
controller('HomeCtrl', ['$timeout', '$window', 'homeState', 'navigator', 'search', function ($timeout, $window, homeState, navigator, search) {
	var ctrl = this;
	ctrl.navigate = navigator.navigate;
	ctrl.menuOpen = false; 
	ctrl.searchDateInput = new Date(homeState.searchWindow.start.getFullYear(), homeState.searchWindow.start.getMonth(), homeState.searchWindow.start.getDate());
	ctrl.searchHoursInput = homeState.searchWindow.start.getHours();
	var markers = [];
	function clearMarkers() {
		for (var i = 0; i < markers.length; i++) {
			$window.google.maps.event.clearInstanceListeners(markers[i]);
			markers[i].setMap(null);
		}	
	}
	function clearMap() {
		clearMarkers();
		$window.google.maps.event.clearInstanceListeners(homeState.map);
		$window.document.getElementById('map-container').style.visibility = 'hidden';
	}
	function updateLots() {
		clearMarkers();
		var ne = homeState.map.getBounds().getNorthEast();
		var sw = homeState.map.getBounds().getSouthWest();
		var dia = search.getDistanceFromLatLonInKm(ne.lat(), ne.lng(), sw.lat(), sw.lng());
		search.search({
			lat: homeState.map.getCenter().lat(),
			lng: homeState.map.getCenter().lng(),
			dia: dia,
			start: homeState.searchWindow.start.getTime(),
			end: homeState.searchWindow.end.getTime()
		}).then(function(results) {
			for (var i = 0; i < results.length; i++) {
				(function(result) {
					var icon = 'assets/img/available.png'
					if (result.available === 0) {
						icon = 'assets/img/unavailable.png'
					}
					var marker = new $window.google.maps.Marker({
						position: {lat: result.lat, lng: result.lng},
						map: homeState.map,
						icon: icon
					});
					if (result.available !== 0) {
						$window.google.maps.event.addListener(marker, 'click', function() {
							clearMap();
							$timeout(function() {
								navigator.navigate('/lots/' + result._id + '/' + homeState.searchWindow.start.getTime() + '/' + homeState.searchWindow.end.getTime());
							});
						});
					}
					markers.push(marker);
				})(results[i]);
			};
		}).
		catch(function() {
			navigator.navigate('/error');
		});
	};
	ctrl.searchUpdate = function() {
		ctrl.menuOpen = false;
		homeState.searchWindow.start = new Date(ctrl.searchDateInput.getTime() + ctrl.searchHoursInput * 60 * 60 * 1000);
		homeState.searchWindow.end = new Date(homeState.searchWindow.start.getTime() + 24 * 60 * 60 * 1000);
		updateLots();
	};
	$window.google.maps.event.addListener(homeState.map, 'idle', function() {
		homeState.mapReady = true;
		updateLots();
	});
	$window.document.getElementById('map-container').style.visibility = 'visible';
	if (homeState.mapReady) {
		updateLots();
	}
}]);
})();
