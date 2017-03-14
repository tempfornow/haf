'use strict';
// Connection URL
let MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
let _ = require('lodash')

let validUser = require('../userSchema').validUser
let randomUser = require('../public/deb').randomUser

// var url = 'mongodb://localhost:27017/Hafifa
let db = require('./db')

//Returns users collection
function getUsersCol() {
  return db.getInstance()
    .then(function(db){
      return db.collection('users')
    })
}

function addUser(user) {
  return getUsersCol()
  .then(col => {
      var username = user.username
      return col.findOne({username})
      .catch(err => {
        throw new Error('Adding users is currently unavailable')
      })
      .then(doc => {
        //Throw an error if user doesn't exist. Otherwise,
        //Return user
        if(doc) {
          throw new Error('Username ' + user.username + ' already exists')
        } else {
          return col.insertOne(user)
        }
      })
  })
}

function flushDb() {
  return getUsersCol().
  then(col => {
    return col.deleteMany({})
  })
}

function removeUser(username) {
  //Get users collection
  return getUsersCol()
  .then(col => col.deleteOne({username}))
  .catch(err => new Error('Service is currently unavailable'))
  .then(result => {
    //If user doesn't exist throw an error
    //Otherwise, return empty object to mark success
    if(!result.deletedCount) {
      throw new Error('Username ' + username + ' does not exists')
    } else {
      return {}
    }
  })
}

function getUser(username) {
  return getUsersCol()
  .then(col => col.findOne({username}))
  .catch(err => new Error('Service user is currently unavailable'))
  .then(doc => {
    if(!doc) {
      throw new Error('Username ' + username + ' does not exists')
    } else {
      delete doc['_id']
      return doc
    }
  })
}

function updateUser(user) {
  var username = user.username
  return getUsersCol()
  .then(col => col.updateOne({username},{$set: user}))
  .catch(function(err) {
    throw new Error("Service is temporary unavailable")
  })
  .then(function(result) {
    //If no document was altered return error
    if(!result.matchedCount) {
      throw new Error('Username ' + username + ' does not exists')
    }

    if(!result.modifiedCount) {
      throw new Error("Service is temporary unavailable")
    }

    return user
  })
}

module.exports = {
  flushDb,
  addUser,
  removeUser,
  getUser,
  updateUser
}
