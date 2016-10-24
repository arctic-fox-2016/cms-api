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

// var userSchema = new mongoose.Schema({
//   email: { type: String, unique: true},
//   password: String,
// }, schemaOptions);
//
// //

//model users


var userSchema = new mongoose.Schema(
  {
      email: String,
      password: String,
    }
);


userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);



//setup passport
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local-login', new LocalStrategy({
  email : 'email', // by default, local strategy uses username and password, we will override with email
  password : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
}, function(req, email, password, done) {
  User.findOne({ 'email' :  email }, function(err, user) {
    if (err){
      return done(err);
    }
    if (!user){
      return done(null, false, req.flash('loginMessage', 'No user found.'));
    }
    if (!user.validPassword(password)){
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
    }
    return done(null, user);
  })
}))
let User = mongoose.model('User', userSchema);

module.exports = User;
