var controller = function($scope, $rootScope, usersService,identityService, updateService) {

  this.updateProfile = function(){

    usersService.getUser($scope.username).then(function(user) {
      var firstname = user.firstname
      var surname = user.surname
      var age = user.age

      $scope.profile = {firstname,surname, age}
      $scope.dataReady = true
    })
  }

  this.$onInit = function() {

    $scope.dataReady = false
    $scope.username = this.resolve.username
    this.ownAccount = ($scope.username === $rootScope.user)
    this.updateProfile()

    if($rootScope.updatePeriodically) {
      $scope.updatePromise = updateService.addListener(this.updateProfile)
    }
  }

  var stopUpdate = function() {
    updateService.removeListener($scope.updatePromise)
  }

  this.removeAccount = function() {
    usersService.removeUser($scope.username)
    .then(function(result) {
      console.log("Finished removal")
      stopUpdate()
      return true
    })
    .then(function(result) {
      console.log("Removed user")
      if($rootScope.user === $scope.username) {
        $rootScope.user = ''
        identityService.logout()
      }

    })
    this.close()
  }

  this.$onDestroy = stopUpdate
}


app.component('profileCard', {
  templateUrl: './src/templates/profile-modal.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller
})
