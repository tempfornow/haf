function usersService($http) {
    this.addUser = function(userData) {
//       var username = userData.username

       return $http.post('http://127.0.0.1:9000/', userData)
       .then(function(response) {
           console.log(response.data.body);
           return response.data.body.isSuccessfull
       }, function(err) {
            return false
       })
//       if(store.has(username)) {
//           return false
//       } else {
//           userData.sortNum = 0
//           userData.pagesTurn = 0
//           console.log(userData)
//           store.set(username, userData)
//           return true
//       }
    }
    
    this.incPagesTurn = function(username) {
        store.transact(username,function(user) {user.pagesTurn++})
    }
    this.incSortNum = function(username) {
        store.transact(username,function(user) {user.sortNum++})
    }
    this.login = function(username, password) {
        return (_.some(store.getAll(), {username, password}))
    }

    this.getAll = function() {
        return $http.get('http://127.0.0.1:9000/')
        .then(function(response) {
            console.log(response.data.body);
            return response.data.body;
        })
//        return _.toArray(store.getAll())
    }
}