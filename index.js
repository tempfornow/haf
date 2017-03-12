var express = require("express")
var session = require('express-session')
var path = require('path')
var bodyParser = require('body-parser')
var users = require('./routes/users')
var auth = require('./routes/auth')
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
app.use('/users', users)
app.use('/auth', auth)
// Set public folder
app.use(express.static(path.join(__dirname, 'public')))

// Authentication and Authorization Middleware
var auth = (req, res, next) => {
  if (req.session && Users[req.session.user])
    return next()
  else
    return res.sendStatus(401)
}

app.get("/", (req,res) => {
  res.redirect("/index.html")
})

app.listen(3000)
