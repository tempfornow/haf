function tableController($scope, $rootScope, usersService) {

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
}
