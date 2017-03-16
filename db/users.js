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

let errorCode = {
  USER_DOES_NOT_EXIST: {
    code: 0,
    description: "Requested user doesn't exist"
  },
  SERVICE_UNAVAILABLE: {
    code: 1,
    description: "Service is currently unavailable - please try again letter"
  },
  USER_ALREADY_EXIST: {
    code: 2,
    description: "Requested user already exists"
  },
  INVALID_USER_FORMAT: {
    code: 3,
    description: "Invalid user format"
  }
}

// Checks if login details are valid
function verifyLogin(login) {
  return getUsersCol().
  then(col => col.count({username: login.username,
    password: login.password}))
  .catch(err => {
    throw errorCode.SERVICE_UNAVAILABLE
  })
  .then(count => {
    return count > 0
  })
}

function addUser(user) {
  return getUsersCol()
  .then(col => {
      var username = user.username
      return col.findOne({username})
      .catch(err => {
        throw errorCode.SERVICE_UNAVAILABLE
      })
      .then(doc => {
        //Throw an error if user doesn't exist. Otherwise,
        //Return user
        if(doc) {
          throw errorCode.USER_ALREADY_EXIST
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
  .catch(err => {
    throw errorCode.SERVICE_UNAVAILABLE
  })
  .then(result => {
    //If user doesn't exist throw an error
    //Otherwise, return empty object to mark success
    if(!result.deletedCount) {
      throw errorCode.USER_DOES_NOT_EXIST
    } else {
      return {}
    }
  })
}

function getUser(username) {
  return getUsersCol()
  .then(col => col.findOne({username}))
  .catch(err => {
    throw errorCode.SERVICE_UNAVAILABLE
  })
  .then(doc => {
    if(!doc) {
      throw errorCode.USER_DOES_NOT_EXIST
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
  .catch(err => {
    throw errorCode.SERVICE_UNAVAILABLE
  })
  .then(function(result) {
    //If no document was altered return error
    if(!result.matchedCount) {
      throw errorCode.USER_DOES_NOT_EXIST
    }

    if(!result.modifiedCount) {
      throw errorCode.SERVICE_UNAVAILABLE
    }

    return user
  })
}

function getChunk(query) {
  let page = query.page
  let itemsPerPage = query.itemsPerPage
  let sort = {
    attr: query.attr,
    order: query.order
  }
  let subStr = query.subStr || ''

  return getUsersCol()
  .then(col => col.find({username: RegExp(subStr)}).toArray())
  .catch(err => {
    throw errorCode.SERVICE_UNAVAILABLE
  })
  .then(filtered => {
    let chunk = _.chunk(
        _.orderBy(filtered,sort.attr,sort.order),
        itemsPerPage
    )[page - 1]

    return {chunk, totalItems: filtered.length}
  })
}

// getChunk({page: 3, itemsPerPage: 5, attr:'username', order:'asc', subStr: ''})
// .then(result => {
//   console.log(result)
// })
// .catch(err => {
//   console.log(err)
// })

module.exports = {
  flushDb,
  addUser,
  removeUser,
  getUser,
  updateUser,
  getUsersCol,
  getChunk,
  errorCode,
  verifyLogin
}
