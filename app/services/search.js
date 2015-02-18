(function() {
var intRegex = /^\d+$/;
var decimalRegex = /^-*\d+\.?\d*|-*\.\d+/;
function deg2rad(deg) {
	return deg * (Math.PI/180)
}
angular.module('myApp').
factory('search', ['$q', 'lots', function($q, lots) {
	var service = {
		reservations: [{
			_id: 'r1',
			lot: 'b',
			start: 1424523600000,
			end: 1424556000000 
		},{
			_id: 'r2',
			lot: 'b',
			start: 1424523600000,
			end: 1424538000000
		}]
	};
	service.getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(lon2-lon1); 
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2)
		; 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		return d;
	};
	service.search = function(params) {
		var deferred = $q.defer();
		var lat = params.lat;
		var lng = params.lng;
		var dia = params.dia;
		var start = params.start;
		var end = params.end;
		if (
		lat !== undefined &&
		lng !== undefined &&
		start !== undefined &&
		end !== undefined &&
		decimalRegex.test(lat) &&
		decimalRegex.test(lng) &&
		intRegex.test(start) &&
		intRegex.test(end) &&
		parseInt(start) < parseInt(end)) {
			var result = [];
			for (var i = 0; i < lots.lots.length; i++) {
				if (service.getDistanceFromLatLonInKm(lat,lng,lots.lots[i].lat,lots.lots[i].lng) < dia / 2) {
					var reserved = 0;
					for (var j = 0; j < service.reservations.length; j++) {
						if (service.reservations[j].lot === lots.lots[i]._id &&
						service.reservations[j].start < end &&
						service.reservations[j].end > start) {
							reserved++;
						}
					}
					result.push({
						_id: lots.lots[i]._id,
						lat: lots.lots[i].lat,
						lng: lots.lots[i].lng,
						available: lots.lots[i].spaces - lots.lots[i].buffer - reserved 
					});
				}
			}
			deferred.resolve(result);
		} else {
			deferred.reject();	
		}
		return deferred.promise;
	}
	return service;
}]);
})();
