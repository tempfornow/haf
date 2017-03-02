app.controller('profileCardModalController', function($uibModal, $log, $document) {
    var $ctrl = this;


    $ctrl.open = function (user, parentSelector) {
          var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: './src/templates/profile-modal.html',
              controller: 'profileCardController',
              controllerAs: '$ctrl',
              size: 'sm',
              appendTo: parentElem,
              resolve: {
                user: function () {
                  return user;
                }
              }
        })

        modalInstance.result.then(function (selectedItem) {
          $ctrl.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    }
})
