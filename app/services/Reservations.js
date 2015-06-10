(function() {
angular.module('myApp').
factory('Reservations', ['$filter', '$q', 'Lots', function($filter, $q, Lots) {
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
		lot: 'b1',
		start: 1433950325000,
		end: 1433951328000    //http://www.epochconverter.com/
	},
    {
		_id: 'r2',
		lot: 'b2',
		start: 1433950325,
		end: 1433950325 
	},
                            
                            
    {
		_id: 'r3',
		lot: 'b3',
		start: 1433950325,
		end: 1433950325
	}];
	service.query = function(params) {
		var deferred = $q.defer();
		var d = new Date();
		var now = d.getTime();
		var reservattions = [];
		if (params && params.lot) {
			reservations = $filter('filter')(service.reservations, {lot: params.lot}, true);
		} else {
			var reservations = service.reservations;
		}
		if (params && params.active === 'true') {
			deferred.resolve($filter('filter')(reservations, function(value, index) {
				return value.end > now;
			}));
		} else {
			deferred.resolve(reservations);
		}
		return deferred.promise;
	}
	return service;
}]);
})();
