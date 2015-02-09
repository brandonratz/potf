(function() {
angular.module('myApp').
directive('screenHeading', function() {
	return {
		restrict: 'A',
		templateUrl: 'partials/screenHeading.html',
		scope: {
			centerName: '@',
			leftName: '@',
			leftIcon: '@',
			leftFunction: '=',
			rightName: '@',
			rightIcon: '@',
			rightFunction: '='
		},
		bindToController: true,
		controllerAs: 'screenHeading',
		controller: function() {
		}
	};
});
})();
