(function(angular) {
    'use strict';
    angular.module('myapp', ['ngMessages','ngAnimate', 'ngSanitize','ui.bootstrap'])
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
    .controller('loginController', loginController)
    .controller('tableController', tableController)
    .controller('RegisterModalCtrl', RegisterModalCtrl)
    .controller('registerController', registerController)
})(window.angular);