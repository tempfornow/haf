app.service('usersService', function($http) {
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

    this.getUser = function(username) {
      var promise = $http.get('http://localhost:3000/'+ username).
      then(function(response) {
        console.log(response)
        return response.data
      }, function(err) {
        return {err: 'User retreival is currntly unavailable'}
      })

      return promise
    }

    this.removeUser = function(username) {
      var promise = $http.delete('http://localhost:3000/' + username).
      then(function(response) {
        console.log(response)
        if(response.data.err) {
          return {err: 'Cannot remove user ' + username}
        }

        return true
      }, function(err) {
        return {err: 'User removal is currently unavailable'}
      })

      return promise
    }
})
