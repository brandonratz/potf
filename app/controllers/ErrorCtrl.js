(function() {
angular.module('myApp').
controller('ErrorCtrl', ['$window', function ($window) {
	this.reloadApplication = function() {
		$window.location.href = '/';
	}
}]);
})();
