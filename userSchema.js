var Validator = require('jsonschema').Validator

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
var v = new Validator()
v.addSchema(nameSchema, '/Name');
v.addSchema(userSchema, '/User');

module.exports = {
  validUser: function(user) {
    return v.validate(user, userSchema).valid
  }
}
