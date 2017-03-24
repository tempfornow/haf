"use strict";
exports.__esModule = true;
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var users_1 = require("../db/users");
var db = require("../db/db");
chai.use(chaiAsPromised);
chai.should();
//Flush db before tests begin
beforeEach(function () {
    return users_1.flushDb();
});
//Close connection to db after tests end
after(function () {
    db.close();
});
describe('Add users', function () {
    it('Adding user to empty db should be fulfilled', function () {
        return users_1.addUser({ username: 'avi' })
            .should.be.fulfilled;
    });
    it('Adding two users with different usernames to empty db should be fulfilled', function () {
        return users_1.addUser({ username: 'avi' })
            .then(function (result) { return users_1.addUser({ username: 'benny' }); })
            .should.be.fulfilled;
    });
    it('Adding two users with same usernames to empty db should be rejected', function () {
        return users_1.addUser({ username: 'avi' })
            .should.be.fulfilled
            .then(function (result) { return users_1.addUser({ username: 'avi' }); })
            .should.be.rejected;
    });
});
describe('Remove users', function () {
    it('Remove unexisting user from empty db should be rejected', function () {
        return users_1.removeUser({ username: 'avi' }).should.be.rejected;
    });
    it('Remove unexisting user from non-empty db should be rejected', function () {
        return users_1.addUser({ username: 'avi' }).should.be.fulfilled
            .then(function (result) { return users_1.removeUser('benny'); })
            .should.be.rejected;
    });
    it('Remove existing user should be fulfilled', function () {
        return users_1.addUser({ username: 'avi' }).should.be.fulfilled
            .then(function (result) { return users_1.removeUser('avi'); })
            .should.be.fulfilled;
    });
    it('Remove one of two users should be fulfilled', function () {
        return users_1.addUser({ username: 'avi' }).should.be.fulfilled
            .then(function () { return users_1.addUser({ username: 'benny' }); })
            .should.be.fulfilled
            .then(function () { return users_1.removeUser('avi'); })
            .should.be.fulfilled;
    });
    it('Add,remove and add same user should be fulfilled', function () {
        return users_1.addUser({ username: 'avi' })
            .then(function () { return users_1.removeUser('avi'); })
            .then(function () { return users_1.addUser({ username: 'avi' }); })
            .should.be.fulfilled;
    });
});
describe('Get users', function () {
    it('Get user from empty db should be rejected', function () {
        return users_1.getUser({ username: 'avi' }).should.be.rejected;
    });
    it('Add user, then get another user should be rejected', function () {
        return users_1.addUser({ username: 'avi' })
            .then(function () { return users_1.getUser('benny'); }).should.be.rejected;
    });
    it('Add and get same user - should return the user', function () {
        return users_1.addUser({ username: 'avi', age: 19 })
            .then(function () { return users_1.getUser('avi'); })
            .should.eventually.deep.equal({ username: 'avi', age: 19 });
    });
    it('Add and get two users', function () {
        return users_1.addUser({ username: 'avi' })
            .then(function () { return users_1.addUser({ username: 'benny' }); })
            .then(function () { return users_1.getUser('avi'); })
            .should.eventually.deep.equal({ username: 'avi' })
            .then(function () { return users_1.getUser('benny'); })
            .should.eventually.deep.equal({ username: 'benny' });
    });
    it('Add, remove and then get', function () {
        return users_1.addUser({ username: 'avi' })
            .then(function () { return users_1.removeUser('avi'); })
            .then(function () { return users_1.getUser('avi'); })
            .should.be.rejected;
    });
    it('Add two users, remove one of them and then get the removed', function () {
        return users_1.addUser({ username: 'avi' })
            .then(function () { return users_1.addUser({ username: 'benny' }); })
            .then(function () { return users_1.removeUser('avi'); })
            .then(function () { return users_1.getUser('avi'); })
            .should.be.rejected;
    });
    it('Add two users, remove one of them and then get the removed', function () {
        return users_1.addUser({ username: 'avi' })
            .then(function () { return users_1.addUser({ username: 'benny' }); })
            .then(function () { return users_1.removeUser('avi'); })
            .then(function () { return users_1.getUser('benny'); })
            .should.eventually.deep.equal({ username: 'benny' });
    });
    it('Add, remove and add user - then get him', function () {
        return users_1.addUser({ username: 'avi' })
            .then(function () { return users_1.removeUser('avi'); })
            .then(function () { return users_1.addUser({ username: 'avi' }); })
            .then(function () { return users_1.getUser('avi'); })
            .should.eventually.deep.equal({ username: 'avi' });
    });
});
describe('Update user', function () {
    it('update nonexisting user', function () {
        return users_1.updateUser({ username: 'avi' })
            .should.be.rejected;
    });
    it('update existing user - one field', function () {
        return users_1.addUser({ username: 'avi', age: 15 })
            .then(function () { return users_1.updateUser({ username: 'avi', age: 89 }); })
            .then(function () { return users_1.getUser('avi'); })
            .should.eventually.deep.equal({ username: 'avi', age: 89 });
    });
    it('update existing user - two fields', function () {
        return users_1.addUser({ username: 'avi', age: 15, surname: 'cohen' })
            .then(function () { return users_1.updateUser({ username: 'avi', age: 89, surname: 'levy' }); })
            .then(function () { return users_1.getUser('avi'); })
            .should.eventually.deep.equal({ username: 'avi', age: 89, surname: 'levy' });
    });
    it('update existing user - one of two fields', function () {
        return users_1.addUser({ username: 'avi', age: 19, surname: 'cohen' })
            .then(function () { return users_1.updateUser({ username: 'avi', age: 89 }); })
            .then(function () { return users_1.getUser('avi'); })
            .should.eventually.deep.equal({ username: 'avi', age: 89, surname: 'cohen' });
    });
    it('update one of two users', function () {
        return users_1.addUser({ username: 'avi', age: 19, surname: 'cohen' })
            .then(function () { return users_1.addUser({ username: 'benny', age: 26, surname: 'levy' }); })
            .then(function () { return users_1.updateUser({ username: 'avi', age: 89 }); })
            .then(function () { return users_1.getUser('avi'); })
            .should.eventually.deep.equal({ username: 'avi', age: 89, surname: 'cohen' });
    });
    it('update removed user', function () {
        return users_1.addUser({ username: 'avi', age: 19, surname: 'cohen' })
            .then(function () { return users_1.removeUser('avi'); })
            .then(function () { return users_1.updateUser({ username: 'avi', age: 89 }); })
            .should.be.rejected;
    });
});
