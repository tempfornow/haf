var express = require('express')
var router = express.Router()

import {usersCol} from '../db/users'

router.post("/login", (req,res) => {
  var username = req.body.username
  var password = req.body.password
  usersCol.verifyLogin({username,password})
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

export {router}
