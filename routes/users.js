var express = require('express')
var router = express.Router()

var _ = require("lodash")
var validUser = require('../userSchema').validUser
var Users  = require('../db/users')

router.get("/list", (req, res) => {
  Users.getChunk(req.query)
  .then(result => {
    res.ok(result)
  })
  .catch(err => {
    res.err("Service is currently unavailable")
  })
})

router.get("/:username", (req,res) => {

  var username = req.params.username
  Users.getUser(username)
  .then(user => {
    res.ok(user)
  })
  .catch(err => {
    res.err("User "+username+" doesn't exist")
  })
})

router.post("/", (req,res) => {
  var user = req.body

  if(!validUser(user)) {
    res.err("Invalid user format")
    return
  }

  Users.addUser(user)
  .then(result => {
    res.ok([])
  })
  .catch(err => {
    res.err('User already exists')
  })

})

router.put("/", (req,res) => {
  var user = req.body

  if(!validUser(user)) {
    res.err("Invalid user format")
    return
  }

  Users.updateUser(user)
  .then(result => {
    res.ok([])
  })
  .catch(err => {
    res.err("User doesn't exist")
  })
})

router.delete("/:username", (req, res) => {
  var username = req.params.username

  Users.removeUser(username)
  .then(result => {
    res.ok([])
  })
  .catch(err => {
    res.err("User " + username + " doesn't exist")
  })
})

module.exports = router
