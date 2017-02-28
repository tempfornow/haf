function tableController($scope, $rootScope, usersService) {

     $scope.currentPage = 1
     $scope.itemsPerPage = 5

     $scope.dataReady = false
     $scope.totalItems = 124
     $scope.currChunk =[]
     $scope.dataReady = false

     $scope.order = 'asc'
     $scope.sortAttr = 'username'

     //Initialize table
     usersService.getAll().then(function(users) {
        $scope.users = users
        $scope.currChunk = _.chunk(_.orderBy(users,$scope.sortAttr,$scope.order),
            $scope.itemsPerPage)[$scope.currentPage- 1]
        $scope.totalItems = _.keys(users).length
        console.log($scope.totalItems)
        $scope.dataReady = true
     })


     $scope.setCurrentChunk = function() {
         $scope.currChunk = _.chunk(_.orderBy($scope.users,$scope.sortAttr,$scope.order),
                                $scope.itemsPerPage)[$scope.currentPage- 1]
     }

     $scope.pageChanged = function() {
         usersService.incPagesTurn($rootScope.user)
         console.log('Page changed to: ' + $scope.currentPage);
         $scope.setCurrentChunk()
     }

     $scope.sortBy = function(attr) {
         usersService.incSortNum($rootScope.user)
         var currOrder = $scope.order

         if($scope.sortAttr === attr) {
             $scope.order = (currOrder === "asc") ? "desc" : "asc"
         } else {
             $scope.sortAttr = attr
             $scope.order = "asc"
         }

         $scope.totalItems = $scope.users.length
         $scope.setCurrentChunk()
     }
}
