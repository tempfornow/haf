app.controller('loginModalController', function($uibModal, $log) {
    var $ctrl = this;


  $ctrl.open = function (username) {
    var modalInstance = $uibModal.open({
      animation: true,
      size: 'sm',
      component: 'loginModal',
      resolve: {
        username: function () {
          return "sdsa"
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
