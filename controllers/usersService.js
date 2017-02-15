function usersService() {
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
}