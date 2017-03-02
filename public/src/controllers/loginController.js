app.controller('loginController', function($uibModalInstance, $rootScope, $scope, identityService) {


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

  $scope.logout = function() {
    identityService.logout
    var promise = $http.post('http://localhost:3000/identity/logout')
    .then(function(response) {
      return true
    },function(err) {

    })

    promise.then(function(response) {
      rootScope.user = ''
    })
    $rootScope.user = ""
    $scope.isValidLogin = true
  }
})
