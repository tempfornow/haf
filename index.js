var express = require("express")
var session = require('express-session')
var path = require('path')
var _ = require("lodash")
var bodyParser = require('body-parser')
var validUser = require('./userSchema').validUser
var randomUser = require('./public/deb').randomUser
var app = express()



// Add body-parser
app.use(bodyParser.json())       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

//Session configuration
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}))


//Add custom code response middleware
app.use(function(req,res,next) {
  res.ok = function(data) {
    res.status(200).send(data)
  }

  res.err = function(errMsg) {
    res.send({err: errMsg})
  }
  next()
})

// Set public folder
app.use(express.static(path.join(__dirname, 'public')))

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && Users[req.session.user])
    return next()
  else
    return res.sendStatus(401)
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

for( i in _.range(5)) {
  var user = randomUser()
  Users[user.username] = user
}
console.log(Users)

app.post("/login", function(req,res){
  var username = req.body.username
  var password = req.body.password
  if(Users[username] && Users[username].password === password) {
    req.session.user = username
    res.ok("Logged in")
  } else {
    res.err("Login failed")
  }
})

app.post("/auth/logout", function(req,res){
  if(req.session) {
    req.session.destroy()
    res.ok("logout success!")
  }
})
app.post("/auth/identity", function(req,res){
  if(req.session) {
    res.ok({username: req.session.user})
    return
  }
  res.ok({})

})



app.get("/", function(req,res) {
  res.redirect("/index.html")
})

app.get("/list", function(req, res) {
  var query = req.query
  var page = query.page
  var itemsPerPage = query.itemsPerPage
  var sort = {
    attr: query.attr,
    order: query.order
  }

  console.log()

  var chunk = _.chunk(
    _.orderBy(Users,sort.attr,sort.order),
    itemsPerPage
  )[page - 1]

  // console.log(chunk)
  res.ok({chunk,totalItems: _.keys(Users).length})

  // //TODO:Validate query structure
})


app.get("/:username", function(req,res) {
  var username = req.params.username

  if(!Users[username]) {
    res.err("User "+username+" doesn't exist")
  } else {
    res.ok(Users[username])
  }
})

app.post("/", function(req,res){
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

app.put("/", function(req,res){
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

app.delete("/:username", function(req, res) {
  var username = req.params.username

  if(!Users[username]) {
    res.err("User " + username + " doesn't exist")
    return
  } else {
    delete Users[username]
    res.ok(Users)
  }
})



app.listen(3000)
