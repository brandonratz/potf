(function() {
angular.module('myApp').
factory('Lots', ['$q', function($q) {
	var service = function() {
	};
	service.lots = [{
		_id : 'a',
		name : 'Regency Oaks Parking',
		description : 'Regency Oaks Parking',
		lat : 29.629291,
		lng : -82.371552,
		spaces : 23,
		buffer : 2
	},{
		_id : 'b',
		name : '24/7 Parking Spaces at Country Gardens by Shands',
		description : '24/7 Parking Spaces at Country Gardens by Shands',
		lat : 29.633865,
		lng : -82.342722,
		spaces : 5,
		buffer : 1
	}];
	service.get = function(params) {
		var deferred = $q.defer();
		var _id = params._id;
		if (_id !== undefined) {
			var lotIndex = service.lots.map(function(lot) {
				return lot._id;
			}).indexOf(_id);
			if (lotIndex !== -1) {
				deferred.resolve(service.lots[lotIndex]);
			} else {
				deferred.reject();
			}	
		} else {
			deferred.reject();
		}
		return deferred.promise;
	}
	return service;
}]);
})();
