function loginController($uibModalInstance, $rootScope, $scope, usersService) {


$scope.isValidLogin = true

$scope.login = function(username, password) {
    usersService.login(username, password)
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

$scope.logout = function() {
    $rootScope.user = ""
    $scope.isValidLogin = true
}
}
