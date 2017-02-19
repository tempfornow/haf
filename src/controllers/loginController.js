function loginController($uibModalInstance, $rootScope, $scope, usersService) {
        console.log($rootScope)
        $rootScope.user = ""
        $scope.isValidLogin = true

        $scope.login = function(username, password) {
            if(usersService.login(username, password)) {
                $scope.isValidLogin = true
                $rootScope.user = username
                $uibModalInstance.close()
            } else {
                $scope.isValidLogin = false
            }
            console.log($rootScope.user)
        }

        $scope.logout = function() {
            $rootScope.user = ""
            $scope.isValidLogin = true
        }
}
