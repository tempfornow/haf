function navController($scope, $rootScope, usersService) {
  console.log("navbar here")
  $scope.logout = function() {
      $rootScope.user = ""
  }
}
