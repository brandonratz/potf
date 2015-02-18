(function() {
angular.module('myApp').
controller('HomeCtrl', ['uiGmapGoogleMapApi', 'homeState', 'navigator', 'search', function (uiGmapGoogleMapApi, homeState, navigator, search) {
	var ctrl = this;
	ctrl.navigate = navigator.navigate;
	ctrl.menuOpen = false; 
	ctrl.search = homeState.search;
	function updateLots() {
		var center = ctrl.map.control.getGMap().getCenter();
		var ne = ctrl.map.control.getGMap().getBounds().getNorthEast();
		var sw = ctrl.map.control.getGMap().getBounds().getSouthWest();
		search.search(
			{
				lat: center.lat(),
				lng: center.lng(),
				dia: search.getDistanceFromLatLonInKm(ne.lat(), ne.lng(), sw.lat(), sw.lng()),
				start: ctrl.search.start.getTime(),
				end: ctrl.search.end.getTime()
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
	ctrl.searchDateInput = new Date(ctrl.search.start.getFullYear(), ctrl.search.start.getMonth(), ctrl.search.start.getDate());
	ctrl.searchHoursInput = ctrl.search.start.getHours();
	uiGmapGoogleMapApi.then(function(maps) {
		ctrl.searchUpdate = function() {
			ctrl.menuOpen = false;
			ctrl.search.start = new Date(ctrl.searchDateInput.getTime() + ctrl.searchHoursInput * 60 * 60 * 1000);
			ctrl.search.end = new Date(ctrl.search.start.getTime() + 24 * 60 * 60 * 1000);
			updateLots();
		};
		ctrl.map = homeState.map;
		ctrl.map.options = {
			disableDefaultUI: true,
			zoomControl: true,
			zoomControlOptions: {
				style: maps.ZoomControlStyle.DEFAULT,
				position: maps.ControlPosition.BOTTOM_LEFT
			},
			scaleControl: true
		};
		ctrl.map.events = {
			idle: updateLots
		};
		ctrl.map.control = {};
    	});
}]);
})();
