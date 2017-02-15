function loginController($scope, usersService) {      
        $scope.user = ""
        $scope.isAuth = false
        $scope.login = function(username, password) {
            $scope.isAuth = usersService.login(username, password)
            $scope.user = username
            console.log($scope.isAuth)
        }
        
        $scope.logout = function() {
            $scope.isAuth = false
            $scope.user = ""
        }
  
}