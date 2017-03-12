
var app = angular.module('myapp', ['ngMessages','ngAnimate','ngRoute', 'ngSanitize','ui.bootstrap'])
app.run(function ($rootScope, $http) {
    $rootScope.user = ''
    $http.post('/auth/identity')
    .then(function(response) {
      $rootScope.user = response.data.username || ''
    }, function(err) {
      $rootScope.user = ''
    })
})
