"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
exports.router = router;
var validUser = require('../userSchema').validUser;
var users_1 = require("../db/users");
// var _ = require("lodash")
// var Users  = require('../db/users')
// var errorCode = Users.errorCode
router.get("/list", function (req, res) {
    users_1.usersCol.getChunk(req.query)
        .then(function (result) {
        res.ok(result);
    })["catch"](function (err) {
        res.err(err);
    });
});
router.get("/:username", function (req, res) {
    var username = req.params.username;
    users_1.usersCol.getUser(username)
        .then(function (user) {
        res.ok(user);
    })["catch"](function (err) {
        res.err(err);
    });
});
router.post("/", function (req, res) {
    var user = req.body;
    if (!validUser(user)) {
        res.err(users_1.errorCode.INVALID_USER_FORMAT);
        return;
    }
    users_1.usersCol.addUser(user)
        .then(function (result) {
        res.ok(user);
    })["catch"](function (err) {
        res.err(err);
    });
});
router.put("/", function (req, res) {
    var user = req.body;
    if (!validUser(user)) {
        res.err(users_1.errorCode.INVALID_USER_FORMAT);
        return;
    }
    users_1.usersCol.updateUser(user)
        .then(function (result) {
        res.ok(user);
    })["catch"](function (err) {
        res.err(err);
    });
});
router["delete"]("/:username", function (req, res) {
    var username = req.params.username;
    users_1.usersCol.removeUser(username)
        .then(function (result) {
        res.ok({});
    })["catch"](function (err) {
        res.err(err);
    });
});
