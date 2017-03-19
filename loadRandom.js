// var Users = {
//   new: {
//     username: "new",
//     password: "alkalkalk",
//     firstname: "la",
//     surname: "sd",
//     age: 20,
//     pagesTurn: 0,
//     sortNum: 0
//   }
// }

'use strict';
//
let close = require('./db/db').close
let getUsersCol = require('./db/users').getUsersCol
let users = require('./db/users')
let addUser = users.getUsersCol
let flushDb = users.flushDb
let _ = require('lodash')

// let promises = []


// let promise = flushDb()
// for(let i in _.range(19)) {
//   // var user = randomUser()
//   promise = promise.then(() => addUser({username: i}))
// }

function randomUser() {
    let username = Math.random().toString(36).substring(24)
    let firstname = _.shuffle(['avi','benny','bar','candy','danny'])[0]
    let surname = _.shuffle(['cohen','levy','miki','abby','baron','candy','dvir'])[0]
    let age = _.shuffle(_.range(18,120))[0]
    let password = "alkalkalk"
    let pagesTurn = 0
    let sortNum = 0
    while(username.length == 0) {
      // console.log("empty")
      username = Math.random().toString(36).substring(14)
    }
    return {username,firstname,surname,age,password,pagesTurn,sortNum}
}

function getRandomUsers(n) {
    var users = []
    for(let i = 0; i < n; i++) {
        var tempUser = randomUser()
        while(users.find(user => (user.username === tempUser.username))) {
          var tempUser = randomUser()
        }
        users.push(tempUser)
    }

    return users
}

flushDb()
.then(() => getUsersCol())
.then(col => col.insertMany(getRandomUsers(19)))
.catch(err => {
  console.log(err)
})
.then( () => {
  close()
})
