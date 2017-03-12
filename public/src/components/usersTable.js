var controller = function($scope, $rootScope, $interval,
  usersService, updateService) {

    this.$onInit = function() {
      $scope.currentPage = 1
      $scope.itemsPerPage = 5

      $scope.dataReady = false
      $scope.totalItems = 0
      $scope.currChunk = []
      $scope.dataReady = false

      $scope.order = 'asc'
      $scope.sortAttr = 'username'

      //Input query string
      $scope.subStr = ''
    }

     $scope.setSubStr = function() {
       $scope.updateChunk()
     }

     $scope.getQuery= function() {
       return {
         page: $scope.currentPage,
         itemsPerPage: $scope.itemsPerPage,
         attr: $scope.sortAttr,
         order: $scope.order,
         subStr: $scope.subStr,
       }
     }

     $scope.updateChunk = function() {
       usersService.getChunk($scope.getQuery()).then(function(result) {
         console.log("Result: ", result)
         $scope.currChunk = result.chunk
         $scope.totalItems = result.totalItems
         $scope.dataReady = true
       })
     }

     $scope.pageChanged = function() {
       $scope.updateChunk()
     }

     //Callback for column sort
     $scope.sortBy = function(attr) {
        //  usersService.incSortNum($rootScope.user)
         var currOrder = $scope.order

         if($scope.sortAttr === attr) {
             $scope.order = (currOrder === "asc") ? "desc" : "asc"
         } else {
             $scope.sortAttr = attr
             $scope.order = "asc"
         }

         $scope.updateChunk()
     }


     //Initialize table
     $scope.updateChunk()

     // Update table when number of items per page changes
     $scope.$watch('itemsPerPage', $scope.updateChunk)

     //Activate periodic update if needed
     $scope.$watch('$root.updatePeriodically', function() {

       if($rootScope.updatePeriodically) {
          $scope.updatePromise = updateService.addListener($scope.updateChunk)
       } else {
         console.log('cancel update')
         updateService.removeListener($scope.updatePromise)
       }
     })

    // Remove periodic update of table when controller is destroyed
     $scope.$on('$destroy', function() {
       updateService.removeListener($scope.updatePromise)
       console.log('tableController destroyed')
     })
}

app.component('usersTable', {
  templateUrl: './src/templates/users-table.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller
});
