function navController($scope, $rootScope, identityService) {
  console.log("navbar here")
  $scope.logout = function() {
      identityService.logout()
      .then(function(success) {
        $rootScope.user = ""
      })
  }
}
