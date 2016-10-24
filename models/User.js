'use strict'
let crypto = require('crypto')
let bcrypt = require('bcrypt-nodejs')
let mongoose = require('mongoose')
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};



var userSchema = new mongoose.Schema(
  {
      email: String,
      password: String,
    }, schemaOptions
);


userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

let User = mongoose.model('User', userSchema);

module.exports = User;
