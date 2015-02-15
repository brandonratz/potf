(function() {
var intRegex = /^\d+$/;
var decimalRegex = /^-*\d+\.?\d*|-*\.\d+/;
function deg2rad(deg) {
	return deg * (Math.PI/180)
}
angular.module('myApp').
factory('search', ['$q', function($q) {
	var service = {
		lots: [{
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
		}],
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
			for (var i = 0; i < service.lots.length; i++) {
				if (service.getDistanceFromLatLonInKm(lat,lng,service.lots[i].lat,service.lots[i].lng) < dia / 2) {
					var reserved = 0;
					for (var j = 0; j < service.reservations.length; j++) {
						if (service.reservations[j].lot === service.lots[i]._id &&
						service.reservations[j].start < end &&
						service.reservations[j].end > start) {
							reserved++;
						}
					}
					result.push({
						_id: service.lots[i]._id,
						name: service.lots[i].name,
						description: service.lots[i].description,
						lat: service.lots[i].lat,
						lng: service.lots[i].lng,
						available: service.lots[i].spaces - service.lots[i].buffer - reserved 
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
