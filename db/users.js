// Connection URL
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
var _ = require('lodash')

var randomUser = require('../public/deb').randomUser

var url = 'mongodb://localhost:27017/Hafifa'

function getUsersCol() {
  return MongoClient.connect(url)
    .then(function(db){
      return db.collection('users')
    })
}

var Users = {
  new: {
    username: "new",
    password: "alkalkalk",
    firstname: "la",
    surname: "sd",
    age: 20,
    pagesTurn: 0,
    sortNum: 0
  }
}

for( i in _.range(19)) {
  var user = randomUser()
  Users[user.username] = user
}
// console.log(Users)
module.exports = Users

//Adds user.if the username already exists
//Throws error
function addUser(user) {
  return getUsersCol()
  .then(function(col) {
    var username = user.username
    return col.findOne({username})
      .then(function(doc) {
        if(doc) {
          throw {err: 'Username ' + user.username + ' already exists'}
        } else {
          return col.insertOne(user)
        }
      })
  })
}

function removeUser(username) {
  return getUsersCol()
  .then(function(col) {
    return col.deleteOne({username})
  })
  .then(function(result) {
    if(!result.deletedCount) {
      throw {message: 'Username ' + username + ' does not exists'}
    } else {
      return {}
    }
  })
}

function getUser(username) {
  return getUsersCol()
  .then(function(col) {
    return col.findOne({username})
  })
  .then(function(doc) {
    if(!doc) {
      throw {message: 'Username ' + username + ' does not exists'}
    } else {
      return doc
    }
  })
}

function updateUser(user) {
  var username = user.username
  return getUsersCol()
  .then(function(col) {
    console.log({username})
    console.log(user)
    return col.updateOne({username},user)
  })
  .then(function(result) {
    //If no document was altered return error
    if(!result.matchedCount) {
      throw new Error('Username ' + username + ' does not exists')
    }

    if(!result.modifiedCount) {
      throw new Error('User update is currently unavailable')
    }

    return user
  })
}

function getMatches(regex) {
  return getUsersCol()
  .then(function(col){
    return col.find({username: regex}).toArray()
  })
  .then(function(user){
    return user
  })
}

function getAll() {
  getUsersCol()
  .then(function(col) {
    return col.find().toArray()
  })
  .then(function(users) {
    console.log(users)
  })
  .catch(function(err) {
    console.log("error occured")
  })
}
