(function() {
angular.module('myApp').
controller('HomeCtrl', ['uiGmapGoogleMapApi', 'search', function (uiGmapGoogleMapApi, search) {
	var ctrl = this;
	ctrl.menuOpen = false; 
	ctrl.toggleMenu = function() { 
		ctrl.menuOpen = ! ctrl.menuOpen; 
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
				start: ctrl.start.getTime(),
				end: ctrl.start.getTime() + 24 * 60 * 60 * 1000
			}
		).
		then(function(data) {
			console.log(data);
			ctrl.lots = data;
		}).
		catch(function() {
			console.log('error');
		});
	}; 
	var now = new Date();
	ctrl.start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()); 
	ctrl.searchDateInput = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	ctrl.searchHoursInput = ctrl.start.getHours();
	uiGmapGoogleMapApi.then(function(maps) {
		ctrl.searchUpdate = function() {
			ctrl.menuOpen = false;
			ctrl.start = new Date(ctrl.searchDateInput.getTime() + ctrl.searchHoursInput * 60 * 60 * 1000);
			updateLots();
		};
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
