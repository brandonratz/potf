(function() {
angular.module('myApp').
factory('Reservations', ['$q', 'Lots', function($q, Lots) {
	var service = function(params) {
		var reservation = this;
		reservation.lot = params.lot;
		reservation.start = params.start;
		reservation.end = params.end;
		reservation.$save = function() {
			var deferred = $q.defer();
			var lot = Lots.lots[Lots.lots.map(function(lot) {
				return lot._id;
			}).indexOf(reservation.lot)];
			var reserved = 0;
			for (var i = 0; i < service.reservations.length; i++) {
 				if (service.reservations[i].start < reservation.end &&
				service.reservations[i].end > reservation.start) {
					reserved++;
				}
			}
			if (lot.spaces - lot.buffer - reserved > 0) {
				var now = new Date();
				reservation._id = 'r' + now.getTime();
				service.reservations.push({
					_id: reservation._id,
					lot: reservation.lot,
					start: reservation.start,
					end: reservation.end
				});
				deferred.resolve();
			} else {
				deferred.reject(409);
			}
			return deferred.promise;
		}
	};
	service.reservations = [{
		_id: 'r1',
		lot: 'b',
		start: 1424523600000,
		end: 1424556000000 
	},{
		_id: 'r2',
		lot: 'b',
		start: 1424523600000,
		end: 1424538000000
	}];
	service.query = function() {
		var deferred = $q.defer();
		deferred.resolve(service.reservations);
		return deferred.promise;
	}
	return service;
}]);
})();