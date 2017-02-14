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
        $scope.isUserAvail = false
        
        $scope.register = function(userData) {
            if(!usersService.addUser(userData)) {
                console.log("username",userData.username,"already taken")
                $scope.isUserAvail = true
            } else {
                console.log("username",userData.username,"added")
                $scope.isUserAvail = false
            }
        }
    }])
    .controller('loginController', function($scope, usersService) {
        
        $scope.user = ""
        $scope.isAuth = false
        $scope.login = function(username, password) {
            $scope.isAuth = usersService.login(username, password)
            $scope.user = username
            console.log($scope.isAuth)
            ""
        }
        
        $scope.logout = function() {
            $scope.isAuth = false
            $scope.user = ""
        }
    })
    .controller('tableController', ['$scope','usersService', function($scope, usersService) {
         $scope.currentPage = 1
         $scope.itemsPerPage = 5    
         $scope.totalItems = usersService.getAll().length
         
         $scope.order = 'asc'
         $scope.sortAttr = 'username'
         
         $scope.currChunk = _.chunk(usersService.getAll(),$scope.itemsPerPage)[$scope.currentPage- 1]
         
         $scope.setCurrentChunk = function() {
             $scope.currChunk = _.chunk(_.orderBy(usersService.getAll(),$scope.sortAttr,$scope.order),
                                    $scope.itemsPerPage)[$scope.currentPage- 1]
         }
        
         $scope.pageChanged = function() {             
             $scope.totalItems = usersService.getAll().length
             console.log('Page changed to: ' + $scope.currentPage);
             $scope.setCurrentChunk()
         }
         
         $scope.sortBy = function(attr) {
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
    }])
})(window.angular);