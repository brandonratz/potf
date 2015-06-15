describe('ReservationsCtrl', function() {
  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
        

        
      var controller = $controller('ReservationsCtrl', { $scope: $scope });
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
         expect($scope.abc).toEqual(14);
        
         expect( ctrl.all ).toEqual(false);  // does not work
           expect( $scope.all ).toEqual(false);  // works 
  
    
    });

  });
});