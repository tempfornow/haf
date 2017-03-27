var express = require("express")
var session = require('express-session')
var path = require('path')
var bodyParser = require('body-parser')
import {router as users} from './routes/users'
import {router as auth} from './routes/auth'
import {db} from './db/db'
let {getInstance, close} = db

var app = express()
getInstance()
.then(col => {
  console.log("DB is working")
  close()
})
.catch(err => {
  console.log(err)
})

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
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))
app.get("/", (req,res) => {
  res.redirect("/index.html")
})

app.listen(3000)
