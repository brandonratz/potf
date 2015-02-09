(function() {
angular.module('myApp').
controller('HomeCtrl', function () {
	this.testleft = function() {
		console.log('left');
	};
	this.testright = function() {
		console.log('right');
	};
});
})();
