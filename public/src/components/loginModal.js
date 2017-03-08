var controller = function($rootScope, $scope, identityService) {


  $scope.isValidLogin = true

  this.$onInit = function() {
    console.log("username: "+this.resolve.username)
  }

  this.login = function(username, password) {
    identityService.login(username, password)
    .then(function(result) {
      if(result.err) {
        $scope.isValidLogin = false
      } else {
        $rootScope.user = username
        this.close()
      }
    }.bind(this), function(err) {
      $scope.isValidLogin = false
    })
  }
}

app.component('loginModal', {
  templateUrl: './src/templates/login-modal.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller
});
