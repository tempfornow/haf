app.service('identityService', function($http) {

  // Address of authentication api
  var apiUrl = 'http://localhost:3000/auth/'

  this.login = function(username, password) {
    console.log(username, password)
    var promise = $http.post(apiUrl + 'login', {username, password})
    .then(function(response) {
      console.log(response)
      if(response.data.err) {
        return {err: 'Invalid login details'}
      }

      return {}
    }, function(err) {
      return {err: 'Login is temporary unavailable'}
    })

    return promise
  }

  this.logout = function() {
    return $http.post(apiUrl + 'logOut')
    .then(function(response) {
      return true
    },function(err) {
      return false
    })
  }

})
