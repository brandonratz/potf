(function() {
angular.module('myApp', [
	'ngRoute',
	'uiGmapgoogle-maps'
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
      		otherwise({
       			redirectTo: '/'
      		});
}]).
config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		key: 'AIzaSyDKwvbP0YXjO5KhUM7gjGKnbVRCbEsofx8',
		v: '3.17',
		libraries: 'weather,geometry,visualization'
	});
}]);
})();
