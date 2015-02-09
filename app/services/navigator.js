(function() {
angular.module('myApp').
factory('navigator', ['$location', function($location) {
	var service = {
		current: '/'
	};
	service.navigate = function(path) {
		service.current = path;
		$location.path(path);
	}
	return service;
}]).
run(['navigator', '$location', '$rootScope', function(navigator, $location, $rootScope) {
	if ($location.path() != '/') {
		$location.path('/');
	}
	$rootScope.$on('$locationChangeStart', function(event, current, previous) {
		var trimmed = current.substring(current.search('#') + 1);	
		if (trimmed != navigator.current) {
			event.preventDefault();
		}
	});
}]);
})();
