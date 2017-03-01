(function(angular) {
    'use strict';
    angular.module('myapp', ['ngMessages','ngAnimate','ngRoute', 'ngSanitize','ui.bootstrap'])
    .run(function ($rootScope, $http) {
        $rootScope.user = ''
        $http.post('http://localhost:3000/auth/identity')
        .then(function(response) {
          console.log(response)
          $rootScope.user = response.data.username || ''
        }, function(err) {
          $rootScope.user = ''
        })
    })
    .directive('loginForm', function() {
        return {
          templateUrl: './src/templates/login-form.html'
        };
    })
    .directive('registerForm', function() {
        return {
          templateUrl: './src/templates/register-form.html'
        };
    })
    .directive('myNavbar', function() {
        return {
          templateUrl: './src/templates/my-navbar.html'
        };
    })
    .directive('usersTable', function() {
        return {
          templateUrl: './src/templates/users-table.html'
        };
    })
    .service('usersService', usersService)
    .service('identityService', identityService)
    .controller('tableController', tableController)
    .controller('LoginModalCtrl', LoginModalCtrl)
    .controller('loginController', loginController)
    .controller('RegisterModalCtrl', RegisterModalCtrl)
    .controller('registerController', registerController)
    .controller('navController', navController)
})(window.angular);
