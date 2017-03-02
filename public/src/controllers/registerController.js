app.controller('registerController', function($uibModalInstance, items, usersService){

    var $ctrl = this
//        Range of valid ages for registration
    $ctrl.validAges = _.range(18,121)
    $ctrl.isUserAvail = true

    $ctrl.register = function(userData) {

      usersService.addUser(Object.assign(userData,{pagesTurn: 0, sortNum: 0}))
      .then(function(result) {
          if(!result.err) {
            $ctrl.isUserAvail = true
            $uibModalInstance.close()
          }

          $ctrl.isUserAvail = false
      })
    }
})
