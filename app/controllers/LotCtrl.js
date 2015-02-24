(function() {
angular.module('myApp').
controller('LotCtrl', ['$routeParams','Lots', 'navigator', 'Reservations', function ($routeParams, Lots, navigator, Reservations) {
	var ctrl = this;
	ctrl.reserved = false;
	ctrl.full = false;
	ctrl.reservations = [];
	ctrl.navigate = navigator.navigate;
	ctrl.start = $routeParams.start;	
	ctrl.end = $routeParams.end;	
	Lots.get({_id: $routeParams._id}).then(function(data) {
		ctrl.lot = data;
	}).catch(function() {
		navigator.navigate('/error');
	});
	function queryActiveReservations() {
		Reservations.query({lot: $routeParams._id, active: 'true'}).then(function(data) {
			ctrl.reservations = data;
		}).catch(function() {
			navigator.navigate('/error');
		});
	};
	ctrl.reserve = function() {
		var reservation = new Reservations({lot: $routeParams._id, start: ctrl.start, end: ctrl.end});
		reservation.$save().then(function() { 
			ctrl.reserved = true;	
			queryActiveReservations();
		})
		.catch(function() {
			ctrl.full = true;
			queryActiveReservations();
		});
	};
	queryActiveReservations();
}]);
})();
