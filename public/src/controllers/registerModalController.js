app.controller('registerModalController', function($uibModal, $log) {
    var $ctrl = this;


  $ctrl.open = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      size: 'sm',
      component: 'registerModal',
    })

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem
    }, function () {
      $log.info('modal-component dismissed at: ' + new Date());
    })
  }
})
