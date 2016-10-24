var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');

/**
 * Login required middleware
 */
 passport.use(new Strategy(
   function(email, password, cb) {
     db.users.findByUsername(email, function(err, user) {
       if (err) { return cb(err); }
       if (!user) { return cb(null, false); }
       if (user.email != password) { return cb(null, false); }
       return cb(null, user);
     })
   }))
   exports.loginPost = function(req, res, next) {
     req.assert('email', 'Email is not valid').isEmail();
     req.assert('email', 'Email cannot be blank').notEmpty();
     req.assert('password', 'Password cannot be blank').notEmpty();
     req.sanitize('email').normalizeEmail({ remove_dots: false });

     var errors = req.validationErrors();

     if (errors) {
       req.flash('error', errors);
       return res.redirect('/login');
     }

     passport.authenticate('local', function(err, user, info) {
       if (!user) {
         req.flash('error', info);
         return res.redirect('/login')
       }
       req.logIn(user, function(err) {
         res.redirect('/');
       });
     })(req, res, next);
   };

   exports.signupPost = function(req, res, next) {
     req.assert('name', 'Name cannot be blank').notEmpty();
     req.assert('email', 'Email is not valid').isEmail();
     req.assert('email', 'Email cannot be blank').notEmpty();
     req.assert('password', 'Password must be at least 4 characters long').len(4);
     req.sanitize('email').normalizeEmail({ remove_dots: false });

     var errors = req.validationErrors();

     if (errors) {
       req.flash('error', errors);
       return res.redirect('/signup');
     }

     User.findOne({ email: req.body.email }, function(err, user) {
       if (user) {
         req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
         return res.redirect('/signup');
       }
       user = new User({
         email: req.body.email,
         password: req.body.password
       })
       user.save(function(err) {
         req.logIn(user, function(err) {
           res.redirect('/');
         });
       });
     });
   };
