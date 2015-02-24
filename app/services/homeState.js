(function() {
angular.module('myApp').
factory('homeState', ['$window', function($window) {
	var service = {
		mapReady: false,
		searchWindow: {
		}
	};
	var now = new Date();
	service.searchWindow.start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
	service.searchWindow.end = new Date(service.searchWindow.start.getTime() + 24 * 60 * 60 * 1000);
        var mapOptions = {
                center: {
			lat : 29.6316144,
			lng : -82.3595472
		},
                zoom: 13,
                disableDefaultUI: true,
                zoomControl: true,
                zoomControlOptions: {
                        style: $window.google.maps.ZoomControlStyle.DEFAULT,
                        position: $window.google.maps.ControlPosition.BOTTOM_LEFT
                },
                scaleControl: true
        };
	service.map = new $window.google.maps.Map($window.document.getElementById('map-container'), mapOptions);
	return service;
}]);
})();
