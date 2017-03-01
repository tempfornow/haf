function navController($scope, $rootScope, usersService) {
  console.log("navbar here")
  $scope.logout = function() {
      usersService.logout()
      .then(function(success) {
        $rootScope.user = ""
      })
  }
}
