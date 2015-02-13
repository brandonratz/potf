(function() {

var DIA = 2;

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
		search.search(
			{
				lat: ctrl.map.center.latitude,
				lng: ctrl.map.center.longitude,
				start: 0,
				end: 1
			}
		).
		then(function(data) {
			console.log(data);
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
				dragend: updateLots
			}
			
		};	
		updateLots();
    	});
}]);
})();
