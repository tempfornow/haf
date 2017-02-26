var express = require("express")
var session = require('express-session');
var path = require('path')
var _ = require("lodash")
var bodyParser = require('body-parser')
var Validator = require('jsonschema').Validator

var app = express()
var v = new Validator()



// User schema
var nameSchema = {id:"/Name", type: "string",  required: true, minLength: 1, pattern: /^[a-zA-Z]*$/}
var userSchema = {
  id: "/User",
  type: "object",
  properties: {
    username: {type: "string", required: true, pattern: /^[a-zA-Z0-9]*$/},
    password: {type: "string", minLength: 8, required: true,  pattern: /^[^\s]+$/},
    firstname: {"$ref": "/Name"},
    surname: {"$ref": "/Name"},
    age: {type: "integer", minimum: 18, maximum: 120,  required: true},
    pagesTurn: {type:"integer", minimum: 0,  required: true},
    sortNum: {type:"integer", minimum: 0,  required: true},
  },
}
v.addSchema(nameSchema, '/Name');
v.addSchema(userSchema, '/User');

// Add body-parser
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

var Users = {}


function validUser(user) {
  return v.validate(user, userSchema).valid
}

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

app.get("/", function(req,res) {
  res.redirect("/index.html")
})

app.get("/list", function(req, res) {
  res.ok(Users)
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
    return;
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
    return;
  }

  if(validUser(user)) {
    Users[username] = user
    res.ok(Users)
  } else {
    res.err("Invalid user format")
  }

})

app.delete("/:username", function(req, res) {
  console.log(Users)
  var username = req.params.username

  if(!Users[username]) {
    res.err("User " + username + " doesn't exist")
    return;
  } else {
    delete Users[username]
    console.log(Users)
    res.ok(Users)
  }
})


app.post("/login", function(req,res){

})

app.listen(3000)
