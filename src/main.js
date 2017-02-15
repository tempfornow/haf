(function(angular) {
    'use strict';
    angular.module('myapp', ['ngMessages','ngAnimate','ngRoute', 'ngSanitize','ui.bootstrap']) 
    .run(function ($rootScope) {
        $rootScope.user = "";
    })
    .directive('loginForm', function() {
        return {
          templateUrl: './templates/login-form.html'
        };
    })
    .directive('registerForm', function() {
        return {
          templateUrl: './templates/register-form.html'
        };
    })    
    .directive('myNavbar', function() {
        return {
          templateUrl: './templates/my-navbar.html'
        };
    })
    .directive('usersTable', function() {
        return {
          templateUrl: './templates/users-table.html'
        };
    })
    .service('usersService', usersService)
    .controller('tableController', tableController)
//    .controller('LoginModalCtrl', LoginModalCtrl)
    .controller('loginController', loginController)
    .controller('RegisterModalCtrl', RegisterModalCtrl)
    .controller('registerController', registerController)
})(window.angular);