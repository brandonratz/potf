(function() {
angular.module('myApp', [
	'ngRoute', 'ngMock'
])

.controller('PasswordController', function PasswordController($scope) {
  $scope.password = '';
  $scope.grade = function() {
    var size = $scope.password.length;
    if (size > 8) {
      $scope.strength = 'strong';
    } else if (size > 3) {
      $scope.strength = 'medium';
    } else {
      $scope.strength = 'weak';
    }
  };
})
.config(['$routeProvider', function($routeProvider) {
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
		when('/reservations', {
      	  		templateUrl: 'partials/reservations.html',
       			controller: 'ReservationsCtrl',
			controllerAs: 'reservations'
      		}).
       when('/help', {
      	  		templateUrl: 'partials/help.html',
       			controller: 'ReservationsCtrl',
			controllerAs: 'reservations'
      		}).
        when('/logout', {
      	  		templateUrl: 'partials/home.html',
       			controller: 'HomeCtrl',
			controllerAs: 'home'
      		}).
      		otherwise({
       			redirectTo: '/'
      		});
}]);
})();


