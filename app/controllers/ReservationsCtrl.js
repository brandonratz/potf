(function() {
angular.module('myApp').
controller('ReservationsCtrl', ['navigator', 'Reservations', '$scope', function (navigator, Reservations,$scope) {
	var ctrl = this;
	   
    
    ctrl.all = false;
    $scope.all= false;
    
    
    
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
         console.log('test show');
       
		ctrl.all = true;
		Reservations.query().then(function(data) {
			ctrl.reservations = data;
              console.log(ctrl.reservations);
		}).catch(function() {
			navigator.navigate('/error');
		});
	};
    ctrl.cancel = function(key) {
        console.log('test cenale');
          console.log(ctrl.reservations+"  "+key);
       // debugger;
     delete ctrl.reservations[key]; 
		
	};
    
    $scope.abc=14;
       $scope.password = '';
  $scope.grade = function() {
    var size = $scope.password.length;
    if (size > 8) {
      $scope.strength = 'strong';
    } else if (size > 3) {
      $scope.strength = 'medium';
    } else {
      $scope.strength = 'weak';
    }
  };
    
    
    
}]);
})();
