app.controller('tableController',function($scope, $rootScope, $interval, usersService) {

     $scope.currentPage = 1
     $scope.itemsPerPage = 5

     $scope.dataReady = false
     $scope.totalItems = 0
     $scope.currChunk = []
     $scope.dataReady = false

     $scope.order = 'asc'
     $scope.sortAttr = 'username'


     $scope.getQuery= function() {
       return {
         page: $scope.currentPage,
         itemsPerPage: $scope.itemsPerPage,
         attr: $scope.sortAttr,
         order: $scope.order
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

     //Update interval in seconds
     var period = 10 * 1000
     var updatePeriodically

     //Activate periodic update if needed
     $scope.$watch('$root.updatePeriodically', function() {

      //  $rootScope.updatePeriodically = true
       if($rootScope.updatePeriodically) {
         updatePeriodically = $interval(function(){
           console.log('Updating')
           $scope.updateChunk()
         }, period)
       } else {
         console.log('cancel update')
         $interval.cancel(updatePeriodically)
       }
     })

    //  var updatePeriodically = $interval(function(){
    //    console.log('Updating')
    //    $scope.updateChunk()
    //  }, period)
    //  if($rootScope.updatePeriodically) {
    //    updatePeriodically
    //  }

    // Remove periodic update of table when controller is destroyed
     $scope.$on('$destroy', function() {
       $interval.cancel(updatePeriodically)
       console.log("destroyed")
     })
})
