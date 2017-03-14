'use strict';
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert')

var url = 'mongodb://localhost:27017/Hafifa'

let dbInstance = null


function getInstance() {
  if(dbInstance) {
    return Promise.resolve(dbInstance)
  }

  return MongoClient.connect(url)
  .then( db => {
    dbInstance = db
    return dbInstance
  })
}

function close() {
  if(dbInstance) {
    dbInstance.close()
    dbInstance = null
  }
}

module.exports = {
  getInstance,
  close
}
