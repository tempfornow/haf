function usersService($http) {
    this.addUser = function(userData) {
      return $http.post('http://localhost:3000/', userData)
      .then(function(response) {
        console.log(response)
        return response.data
      }, function(err) {
          return {err: "Registration is currently unavailable"}
      })
    }

    this.incPagesTurn = function(username) {
        store.transact(username,function(user) {user.pagesTurn++})
    }
    this.incSortNum = function(username) {
        store.transact(username,function(user) {user.sortNum++})
    }
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

    this.getAll = function() {
        var promise = $http.get('http://localhost:3000/list').
        then(function(response) {
          console.log(response)
          return response.data
        }, function(err) {
          return {err: "Users retreival is currently unavailable"}
        })

        return promise
    }

    this.getChunk = function(query) {
        // convert query json to standart get request
        // query(for instance ?a=12&b=sdsd)
        console.log('http://localhost:3000/list?'+ $.param(query))
        var promise = $http.get('http://localhost:3000/list?'+ $.param(query)).
        then(function(response) {
          console.log(response)
          return response.data
        }, function(err) {
          return {err: "Users retreival is currently unavailable"}
        })

        return promise
    }
}
