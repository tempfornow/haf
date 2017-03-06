app.controller('profileCardModalController', function($uibModal, $log) {
    var $ctrl = this;


  $ctrl.open = function (username) {
    var modalInstance = $uibModal.open({
      animation: true,
      component: 'profileCard',
      resolve: {
        username: function () {
          return username
        }
      }
    })

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem
    }, function () {
      $log.info('modal-component dismissed at: ' + new Date());
    })
  }
})
