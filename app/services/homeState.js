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
		},
		search: {
		}
	};
	var now = new Date();
	service.search.start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
	service.search.end = new Date(service.search.start.getTime() + 24 * 60 * 60 * 1000);
	return service;
});
})();
