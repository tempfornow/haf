"use strict";
exports.__esModule = true;
var express = require("express");
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var users_1 = require("./routes/users");
var auth_1 = require("./routes/auth");
var db_1 = require("./db/db");
var getInstance = db_1.db.getInstance, close = db_1.db.close;
var app = express();
getInstance()
    .then(function (col) {
    console.log("DB is working");
    close();
})["catch"](function (err) {
    console.log(err);
});
// Add body-parser
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
//Session configuration
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
//Add custom code response middleware
app.use(function (req, res, next) {
    res.ok = function (data) {
        res.status(200).send(data);
    };
    res.err = function (errMsg) {
        res.send({ err: errMsg });
    };
    next();
});
app.use('/users', users_1.router);
app.use('/auth', auth_1.router);
// Set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function (req, res) {
    console.log("here")
    res.redirect("/index.html");
});
app.listen(3000);
