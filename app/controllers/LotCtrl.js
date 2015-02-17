(function() {
angular.module('myApp').
controller('LotCtrl', ['$routeParams','navigator', function ($routeParams, navigator) {
	var ctrl = this;
	ctrl.navigate = navigator.navigate;
	console.log($routeParams);	
}]);
})();
