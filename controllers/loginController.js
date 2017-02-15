function loginController($rootScope, $scope, usersService) {  
        console.log($rootScope)
        $rootScope.user = ""
        $scope.login = function(username, password) {
            if(usersService.login(username, password)) {
                $rootScope.user = username
            }
            console.log($rootScope.user)
        }
        
        $scope.logout = function() {
            $rootScope.user = ""
        }
  
}