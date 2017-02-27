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

    this.getAll = function() {
        var promise = $http.get('http://localhost:3000/list').
        then(function(response) {
          console.log(response.data)
          // if(response.data.err) {
          //   return {err: "Users retreival is currently unavailable"}
          // }
          //
          // return response.data.
        }, function(err) {
          return {err: "Users retreival is currently unavailable"}
        })
        return $http.get('http://localhost:3000/')
        .then(function(response) {
            console.log(response.data.body);
            return response.data.body;
        })
//        return _.toArray(store.getAll())
    }
}
