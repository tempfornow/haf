(function(angular) {
    'use strict';
    angular.module('myapp', ['ngMessages','ngAnimate','ngRoute', 'ngSanitize','ui.bootstrap'])
    .run(function ($rootScope) {
        $rootScope.user = "";
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
    .controller('tableController', tableController)
    .controller('LoginModalCtrl', LoginModalCtrl)
    .controller('loginController', loginController)
    .controller('RegisterModalCtrl', RegisterModalCtrl)
    .controller('registerController', registerController)
    .controller('navController', navController)
})(window.angular);
