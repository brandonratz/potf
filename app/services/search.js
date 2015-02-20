(function() {
var intRegex = /^\d+$/;
var decimalRegex = /^-*\d+\.?\d*|-*\.\d+/;
function deg2rad(deg) {
	return deg * (Math.PI/180)
}
angular.module('myApp').
factory('search', ['$q', 'Lots', 'Reservations', function($q, Lots, Reservations) {
	var service = {
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
			for (var i = 0; i < Lots.lots.length; i++) {
				if (service.getDistanceFromLatLonInKm(lat,lng,Lots.lots[i].lat,Lots.lots[i].lng) < dia / 2) {
					var reserved = 0;
					for (var j = 0; j < Reservations.reservations.length; j++) {
						if (Reservations.reservations[j].lot === Lots.lots[i]._id &&
						Reservations.reservations[j].start < end &&
						Reservations.reservations[j].end > start) {
							reserved++;
						}
					}
					result.push({
						_id: Lots.lots[i]._id,
						lat: Lots.lots[i].lat,
						lng: Lots.lots[i].lng,
						available: Lots.lots[i].spaces - Lots.lots[i].buffer - reserved 
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
