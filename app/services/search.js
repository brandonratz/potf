(function() {
var intRegex = /^\d+$/;
var decimalRegex = /^-*\d+\.?\d*|-*\.\d+/;

// JAVASCRIPT IMPLEMENTATION OF HAVERSINE FORMULA
function deg2rad(deg) {
	return deg * (Math.PI/180)
}
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
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
}

angular.module('myApp').
factory('search', function() {
	var service = {
		lots: [{
			_id : "a",
			name : "Test Lot",
			description : "Test Lot Description",
			lat : 29.6254423,
			lng : -82.4373587,
			spaces : 10,
			buffer : 2
		},{
			_id : "b",
			name : "Test Lot 2",
			description : "Test Lot 2 Description",
			lat : 29.6254423,
			lng : -82.4373587,
			spaces : 10,
			buffer : 2
		}]
	};
	service.search = function(params, success, error) {
		var DIA = 2;
		var lat = params.lat;
		var lng = params.lng;
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
				if (getDistanceFromLatLonInKm(lat,lng,service.lots[i].lat,service.lots[i].lng) < DIA) {
					result.push({
						_id: service.lots[i]._id,
						name: service.lots[i].name,
						description: service.lots[i].description,
						lat: service.lots[i].lat,
						lng: service.lots[i].lng,
						available: 0
					});
				}
			}
			success(result);
		} else {
			error();
		}
	}
	return service;
});
})();