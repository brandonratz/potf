(function() {
angular.module('myApp').
controller('LotCtrl', ['$routeParams','lots', 'navigator', function ($routeParams, lots, navigator) {
	var ctrl = this;
	ctrl.navigate = navigator.navigate;
	ctrl.start = $routeParams.start;	
	ctrl.end = $routeParams.end;	
	lots.get({_id: $routeParams._id}).then(function(data) {
		ctrl.lot = data;
	}).catch(function() {
		navigator.navigate('/error');
	});
}]);
})();
