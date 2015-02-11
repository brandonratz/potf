(function() {
angular.module('myApp').
controller('HomeCtrl', ['uiGmapGoogleMapApi', '$scope', function (uiGmapGoogleMapApi, $scope) {
	var ctrl = this;
	ctrl.testleft = function() {
		console.log('left');
	};
	ctrl.testright = function() {
		console.log('right');
	};
	uiGmapGoogleMapApi.then(function(maps) {
		ctrl.map = {
			center: {
				latitude : 29.6254423,
                        	longitude : -82.4373587
			},
			zoom: 13,
			options: {
				disableDefaultUI: true,
				zoomControl: true,
				zoomControlOptions: {
					style: maps.ZoomControlStyle.DEFAULT,
					position: maps.ControlPosition.BOTTOM_LEFT
				},
				scaleControl: true
			}
		};	
    });
}]);
})();
