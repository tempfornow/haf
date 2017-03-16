var express = require('express')
var router = express.Router()

var _ = require("lodash")
var validUser = require('../userSchema').validUser
var Users  = require('../db/users')
var errorCode = Users.errorCode

router.get("/list", (req, res) => {
  Users.getChunk(req.query)
  .then(result => {
    res.ok(result)
  })
  .catch(err => {
    res.err(err)
  })
})

router.get("/:username", (req,res) => {

  var username = req.params.username
  Users.getUser(username)
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

  Users.addUser(user)
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

  Users.updateUser(user)
  .then(result => {
    res.ok(user)
  })
  .catch(err => {
    res.err(err)
  })
})

router.delete("/:username", (req, res) => {
  var username = req.params.username

  Users.removeUser(username)
  .then(result => {
    res.ok({})
  })
  .catch(err => {
    res.err(err)
  })
})

module.exports = router
