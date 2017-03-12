var express = require('express')
var router = express.Router()

var _ = require("lodash")
var validUser = require('../userSchema').validUser
var Users  = require('../db/users')


router.get("/list", (req, res) => {
  var query = req.query
  var page = query.page
  var itemsPerPage = query.itemsPerPage
  var sort = {
    attr: query.attr,
    order: query.order
  }
  var subStr = query.subStr || ''

  console.log()

  var filtered = _.filter(Users,
    function(user) {
      return user.username.includes(subStr)
    })

  var chunk = _.chunk(
      _.orderBy(filtered,sort.attr,sort.order),
      itemsPerPage
  )[page - 1]

  // console.log(chunk)
  res.ok({chunk,totalItems: _.keys(filtered).length})

  // //TODO:Validate query structure
})

router.get("/:username", (req,res) => {
  var username = req.params.username

  if(!Users[username]) {
    res.err("User "+username+" doesn't exist")
  } else {
    res.ok(Users[username])
  }
})

router.post("/", (req,res) => {
  var user = req.body
  var username = user.username
  var password = user.password

  if(Users[username]) {
    res.err("User already exists")
    return
  }

  if(validUser(user)) {
    Users[username] = user
    res.ok(Users)
  } else {
    res.err("Invalid user format")
  }
})

router.put("/", (req,res) => {
  var user = req.body
  var username = user.username
  var password = user.password

  if(!Users[username]) {
    res.err("User doesn't exist")
    return
  }

  if(validUser(user)) {
    Users[username] = user
    res.ok(Users)
  } else {
    res.err("Invalid user format")
  }

})

router.delete("/:username", (req, res) => {
  var username = req.params.username

  if(!Users[username]) {
    res.err("User " + username + " doesn't exist")
    return
  } else {
    delete Users[username]
    res.ok(Users)
  }
})

module.exports = router
