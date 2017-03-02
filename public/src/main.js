
var app = angular.module('myapp', ['ngMessages','ngAnimate','ngRoute', 'ngSanitize','ui.bootstrap'])
app.run(function ($rootScope, $http) {
    $rootScope.user = ''
    $http.post('http://localhost:3000/auth/identity')
    .then(function(response) {
      console.log(response)
      $rootScope.user = response.data.username || ''
    }, function(err) {
      $rootScope.user = ''
    })
})
