var controller = function($scope, $rootScope, identityService) {

  $scope.logout = function() {
      identityService.logout()
      .then(function(success) {
        $rootScope.user = ""
      })
  }

  $scope.$watch('$root.user', function(newVal) {
    $scope.user = newVal
  })
}

app.component('navbar', {
  templateUrl: './src/templates/my-navbar.html',
  controller
});
