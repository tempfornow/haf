function registerController($uibModalInstance, items, usersService){
    
    var $ctrl = this
//        Range of valid ages for registration
    $ctrl.validAges = _.range(18,121)
    $ctrl.isUserAvail = true
    $ctrl.items = items
    $ctrl.selected = {
        item: $ctrl.items[0]
    }

    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.selected.item)
    }

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel')
    }
    
    $ctrl.register = function(userData) {
        if(!usersService.addUser(userData)) {
            console.log("username",userData.username,"already taken")
            $ctrl.isUserAvail = false
        } else {
            console.log("username",userData.username,"added")
            $ctrl.isUserAvail = true
            $uibModalInstance.close($ctrl.selected.item)
        }
    }
}