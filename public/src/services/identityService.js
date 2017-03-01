function identityService($http) {

    this.login = function(username, password) {
        console.log(username, password)
        var promise = $http.post('http://localhost:3000/login', {username, password})
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
      return $http.post('http://localhost:3000/auth/logout')
      .then(function(response) {
        return true
      },function(err) {
        return false
      })
    }
    
}
