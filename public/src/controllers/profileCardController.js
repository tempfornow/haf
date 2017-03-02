app.controller('profileCardController', function($uibModalInstance, $rootScope, $scope, identityService, user) {

  var $ctrl = this
  $scope.user = user
  console.log($scope.user)
  $scope.isCurrUser = ($rootScope.user == user.username)
  $scope.username = user.username
  // marks if there is an error in account deletion
  $scope.error = false

  $scope.delete = function() {
    usersService.delete($scope.username)
    .then(function(response) {
      if(response.err) {
        $scope.error = true
      }

      $scope.error = false
      $uibModalInstance.close()
    }, function(err) {
      $scope.error = true
    })
  }


})
