"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
exports.router = router;
var users_1 = require("../db/users");
router.post("/login", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    users_1.usersCol.verifyLogin({ username: username, password: password })
        .then(function (isValidLogin) {
        if (isValidLogin) {
            req.session.user = username;
            res.ok('Logged in');
        }
        else {
            res.err('Login failed');
        }
    })["catch"](function (err) {
        res.err(err);
    });
});
router.post("/logout", function (req, res) {
    if (req.session) {
        req.session.destroy();
        res.ok("logout success!");
    }
});
router.post("/identity", function (req, res) {
    if (req.session) {
        res.ok({ username: req.session.user });
        return;
    }
    res.ok({});
});
