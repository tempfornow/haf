var controller = function(usersService){

//        Range of valid ages for registration
  this.$onInit = function() {
    this.validAges = _.range(18,121)
    this.isUserAvail = true
  }

  this.register = function(userData) {

    usersService.addUser(Object.assign(userData,{pagesTurn: 0, sortNum: 0}))
    .then(function(result) {
        if(!result.err) {
          this.isUserAvail = true
          this.close()
        }

        this.isUserAvail = false
    }.bind(this))
  }
}

app.component('registerModal', {
  templateUrl: './src/templates/register-modal.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller
});
