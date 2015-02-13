(function() {
angular.module('myApp').
controller('HomeCtrl', ['uiGmapGoogleMapApi', 'search', function (uiGmapGoogleMapApi, search) {
	var ctrl = this;
	ctrl.testleft = function() {
		console.log('left');
	};
	ctrl.testright = function() {
		console.log('right');
	};
	function updateLots() {
		var center = ctrl.map.control.getGMap().getCenter();
		var ne = ctrl.map.control.getGMap().getBounds().getNorthEast();
		var sw = ctrl.map.control.getGMap().getBounds().getSouthWest();
		search.search(
			{
				lat: center.lat(),
				lng: center.lng(),
				dia: search.getDistanceFromLatLonInKm(ne.lat(), ne.lng(), sw.lat(), sw.lng()),
				start: 0,
				end: 1
			}
		).
		then(function(data) {
			ctrl.lots = data;
		}).
		catch(function() {
			console.log('error');
		});
	}; 
	uiGmapGoogleMapApi.then(function(maps) {
		ctrl.map = {
			center: {
				latitude : 29.6254423,
                        	longitude : -82.4373587
			},
	
			// SETTING OPTIONS HERE BECAUSE OF MAPS DEFAULT CONSTANTS
			options: {
				disableDefaultUI: true,
				zoomControl: true,
				zoomControlOptions: {
					style: maps.ZoomControlStyle.DEFAULT,
					position: maps.ControlPosition.BOTTOM_LEFT
				},
				scaleControl: true
			},
			events: {
				idle: updateLots
			},
			control: {
			}
			
		};	
    	});
}]);
})();
