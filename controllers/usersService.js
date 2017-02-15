function usersService() {
    this.addUser = function(userData) {
       var username = userData.username
       if(store.has(username)) {
           return false
       } else {
           userData.sortNum = 0
           userData.pagesTurn = 0
           console.log(userData)
           store.set(username, userData)
           return true
       }
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
        return _.toArray(store.getAll())
    }
}