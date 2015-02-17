(function() {
angular.module('myApp').
factory('homeState', function() {
	var service = {
		map: {
			center: {
				latitude : 29.6254423,
				longitude : -82.4373587
			},
			zoom: 14
		}
	};
	return service;
});
})();
