(function() {
angular.module('myApp', [
	'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {
      	  		templateUrl: 'partials/home.html',
       			controller: 'HomeCtrl',
			controllerAs: 'home'
      		}).
		when('/error', {
      	  		templateUrl: 'partials/error.html',
       			controller: 'ErrorCtrl',
			controllerAs: 'error'
      		}).
		when('/lots/:_id/:start/:end', {
      	  		templateUrl: 'partials/lot.html',
       			controller: 'LotCtrl',
			controllerAs: 'lot'
      		}).
      		otherwise({
       			redirectTo: '/'
      		});
}]);
})();
