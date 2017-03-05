app.controller('loginFormController', function($uibModalInstance, $rootScope, $scope, identityService) {


$scope.isValidLogin = true

  $scope.login = function(username, password) {
    identityService.login(username, password)
    .then(function(result) {
      if(result.err) {
        $scope.isValidLogin = false
      } else {
        $rootScope.user = username
        $uibModalInstance.close()
      }
    }, function(err) {
      $scope.isValidLogin = false
    })
  }
})
