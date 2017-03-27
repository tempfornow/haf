var express = require('express')
var router = express.Router()
var validUser = require('../userSchema').validUser

import {errorCode, usersCol} from '../db/users'
import * as _ from 'lodash'
// var _ = require("lodash")
// var Users  = require('../db/users')
// var errorCode = Users.errorCode

router.get("/list", (req, res) => {
  usersCol.getChunk(req.query)
  .then(result => {
    res.ok(result)
  })
  .catch(err => {
    res.err(err)
  })
})

router.get("/:username", (req,res) => {

  var username = req.params.username
  usersCol.getUser(username)
  .then(user => {
    res.ok(user)
  })
  .catch(err => {
    res.err(err)
  })
})

router.post("/", (req,res) => {
  var user = req.body

  if(!validUser(user)) {
    res.err(errorCode.INVALID_USER_FORMAT)
    return
  }

  usersCol.addUser(user)
  .then(result => {
    res.ok(user)
  })
  .catch(err => {
    res.err(err)
  })

})

router.put("/", (req,res) => {
  var user = req.body

  if(!validUser(user)) {
    res.err(errorCode.INVALID_USER_FORMAT)
    return
  }

  usersCol.updateUser(user)
  .then(result => {
    res.ok(user)
  })
  .catch(err => {
    res.err(err)
  })
})

router.delete("/:username", (req, res) => {
  var username = req.params.username

  usersCol.removeUser(username)
  .then(result => {
    res.ok({})
  })
  .catch(err => {
    res.err(err)
  })
})

export { router}
