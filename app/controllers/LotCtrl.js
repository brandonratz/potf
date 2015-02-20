(function() {
angular.module('myApp').
controller('LotCtrl', ['$routeParams','Lots', 'navigator', 'Reservations', function ($routeParams, Lots, navigator, Reservations) {
	var ctrl = this;
	ctrl.full = false;
	ctrl.navigate = navigator.navigate;
	ctrl.start = $routeParams.start;	
	ctrl.end = $routeParams.end;	
	ctrl.reserve = function() {
		var reservation = new Reservations({lot: $routeParams._id, start: ctrl.start, end: ctrl.end});
		reservation.$save().then(function() { 
			navigator.navigate('/');
		})
		.catch(function() {
			ctrl.full = true;
		});
	};
	Lots.get({_id: $routeParams._id}).then(function(data) {
		ctrl.lot = data;
	}).catch(function() {
		navigator.navigate('/error');
	});
}]);
})();
