function tableController($scope, $rootScope, usersService) {
     
     $scope.currentPage = 1
     $scope.itemsPerPage = 5

     $scope.dataReady = false
     $scope.totalItems = 0
     $scope.currChunk =[]

     $scope.order = 'asc'
     $scope.sortAttr = 'username'

     usersService.getAll().then(function(users) {
        $scope.dataReady = true
        $scope.users = users
        $scope.currChunk = _.chunk(_.orderBy(users,$scope.sortAttr,$scope.order),
            $scope.itemsPerPage)[$scope.currentPage- 1]
        $scope.totalItems = users.length
     })


     $scope.setCurrentChunk = function() {
         $scope.currChunk = _.chunk(_.orderBy(usersService.getAll(),$scope.sortAttr,$scope.order),
                                $scope.itemsPerPage)[$scope.currentPage- 1]
     }

     $scope.pageChanged = function() {    
         usersService.incPagesTurn($rootScope.user)
         $scope.totalItems = usersService.getAll().length
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

         $scope.totalItems = usersService.getAll().length
         $scope.setCurrentChunk()
     }
}