//angular.module("myapp", [])
//	.controller("SoldiersController", function($scope) {
//		<!-- Initial soldiers list -->
//		$scope.soldiersList = []
//		<!-- List of valid ages(valid age of a soldier) -->
//		$scope.validAges = _.range(18,121)
//		$scope.validRanks = ['קמ"א','קא"ב',
//			'טוראי','רב"ט','סמל','סמ"ר','רס"ל','רס"ר','רס"ם','רס"ב','רנ"ם','רנ"ג',
//			'סג"ם','סגן','סרן','רס"ן','סא"ל','אל"מ','תא"ל','אלוף','רא"ל']
//		<!-- list of ranks -->
//		<!-- Adds soldier according to given data about him -->
//		$scope.addSoldier = function(name,age,rank,discharge) {
//			$scope.soldiersList.push({name,age,rank,discharge})
//		}
//	});  

(function(angular) {
  'use strict';
angular.module('myapp', ['ngMessages','ui.bootstrap'])
    .directive('loginForm', function() {
        return {
          templateUrl: 'login-form.html'
        };
    })
    .directive('registerForm', function() {
        return {
          templateUrl: 'register-form.html'
        };
    })    
    .directive('myNavbar', function() {
        return {
          templateUrl: 'my-navbar.html'
        };
    })
    .directive('usersTable', function() {
        return {
          templateUrl: 'users-table.html'
        };
    })
    .service('usersService', function(){
    
        this.addUser = function(userData) {
           var username = userData.username
           if(store.has(username)) {
               return false
           } else {
               store.set(username, userData)
               return true
           }
        }
        
        this.login = function(username, password) {
            return (_.some(store.getAll(), {username, password}))
        }
        
        this.getAll = function() {
            return _.toArray(store.getAll())
        }
        
    })
    .controller('registerController', ['$scope','usersService', function($scope, usersService) {
//        Range of valid ages for registration
        $scope.validAges = _.range(18,121)
        
//        Marks if the username is already taken
        $scope.isUserAvail = true
        
        $scope.register = function(userData) {
            usersService.addUser(userData)
        }
    }])
    .controller('loginController', function($scope, usersService) {
        
        $scope.user = ""
        
        $scope.login = function(username, password) {
            $scope.isAuth = usersService.login(username, password)
            $scope.user = username
            console.log($scope.isAuth)
            
        }
        
        $scope.logout = function() {
            $scope.isAuth = false
            $scope.user = ""
        }
    })
    .controller('tableController', function($scope, usersService) {
        $scope.getUsers = function() {
            return usersService.getAll()
        }
    })
    .directive('temp', function() {
        return {
            restrict: 'A',
            link: function($scope,e) {
                console.log(e.parent())
            }
        }
    })
    
})(window.angular);