(function() {
angular.module('myApp').
controller('ReservationsCtrl', ['navigator', 'Reservations',  function (navigator, Reservations) {
	var ctrl = this;
	ctrl.all = false;
	ctrl.navigate = navigator.navigate;
	ctrl.reservations = [];
	var d = new Date();
	ctrl.now = d.getTime();
	Reservations.query({active: 'true'}).then(function(data) {
		ctrl.reservations = data;
	}).catch(function() {
		navigator.navigate('/error');
	});
	ctrl.showAll = function() {
		ctrl.all = true;
		Reservations.query().then(function(data) {
			ctrl.reservations = data;
		}).catch(function() {
			navigator.navigate('/error');
		});
	};
}]);
})();
