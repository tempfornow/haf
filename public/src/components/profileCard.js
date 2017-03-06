function controller($scope, $rootScope, usersService) {

  this.$onInit = function() {

    $scope.dataReady = false
    this.username = this.resolve.username
    this.ownAccount = (this.username === $rootScope.user)

    usersService.getUser(this.username).then(function(user) {
      var firstname = user.firstname
      var surname = user.surname
      var age = user.age

      $scope.profile = {firstname,surname, age}
      console.log($scope.profile)
      $scope.dataReady = true
    })
  }

  this.removeAccount = function() {
    usersService.removeUser(this.username)
    .then(function(result) {
      console.log(result)
    })
    this.close()
  }
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
