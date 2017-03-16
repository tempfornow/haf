var express = require('express')
var router = express.Router()

var Users  = require('../db/users')

router.post("/login", (req,res) => {
  var username = req.body.username
  var password = req.body.password
  Users.verifyLogin({username,password})
  .then(isValidLogin => {
    if(isValidLogin) {
      req.session.user = username
      res.ok('Logged in')
    } else {
      res.err('Login failed')
    }
  })
  .catch(err => {
    res.err(err)
  })
  // if(Users[username] && Users[username].password === password) {
  //   req.session.user = username
  //   res.ok("Logged in")
  // } else {
  //   res.err("Login failed")
  // }
})

router.post("/logout", (req,res) => {
  if(req.session) {
    req.session.destroy()
    res.ok("logout success!")
  }
})
router.post("/identity", (req,res) => {
  if(req.session) {
    res.ok({username: req.session.user})
    return
  }
  res.ok({})

})

module.exports = router
