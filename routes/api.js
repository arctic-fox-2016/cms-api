const express = require('express')
const mongoose = require('mongoose')
let router = express.Router()
let helper = require('../controller/helper.js')
let Users = require('../models/users.js')
let Data = require('../models/data.js')
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy

let comparePassword = function(password, correctpassword, callback){
  if(password == correctpassword){
    callback(true)
  } else {
    callback(false)
  }
}

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(id, done) {
  Users.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
},
  function(req,email, password, done) {
    console.log('masuk')
    Users.findOne({'email': email }, function(err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        console.log("salah email")
        return done(null, false, req.flash('login-message', 'Incorrect Email'));
      } else {
        comparePassword(password, user.password, function(isMatch) {
          if (isMatch) {
            console.log("benar")
            return done(null, user)
          } else {
            console.log("salah password")
            return done(null, false, req.flash('login-message', 'Incorrect Email'))
          }
        })
      }
    });
}));


router.post('/register', function(req,res,next){
  helper.errorsInRegistrationField(req.body.email, req.body.password, req.body.confirm_password, function(errors){
    if(errors.length ==0){
      let newuser = new Users({email: req.body.email, password: req.body.password}).save(function(err,result){
        req.flash('register-message', ["Add is Successful"])
        res.redirect('/register')
      })
    } else {
      req.flash('register-message', errors)
      res.redirect('/register')
    }
  })
})

router.post('/login', passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/login' }), function(req, res, next) {
  res.redirect('/')
});

router.post('/data', function(req,res,next){
  let newdata = new Data({letter: req.body.letter, frequency: req.body.frequency}).save(function(err, result){
    if(err){
      res.json({message: "error", detail: err})
    } else {
      res.json({message: "Add is Successful", detai: result})
    }
  })
})

router.put('/data/:id', function(req,res,next){
  console.log(req.params.id)
  Data.update({_id: req.params.id},{letter: req.body.letter, frequency: req.body.frequency}, function(err, result){
    if(err){
      res.json({message: "error", detail: err})
    } else {
      res.json({message: "Add is Successful", detail: result})
    }
  })
})

router.delete('/data/:id', function(req,res,next){
  Data.remove({_id: req.params.id}, function(err, result){
    if(err){
      res.json({message: "error", detail: err})
    } else {
      res.json({message: "Delete is Successful", detail: result})
    }
  })
})

router.get('/data', function(req,res,next){
  Data.find({}, function(err,result){
    if(err){
      res.json({message:"error", detail:err})
    } else {
      res.json(result)
    }
  })
})

router.get('/data/:id', function(req,res,next){
  console.log(req.params.id)
  Data.findOne({_id: req.params.id}, function(err,result){
    if(err){
      res.json({message:"error", detail:err})
    } else {
      res.json(result)
    }
  })
})

router.get('/search', function(req,res,next){
  if(req.query.letter == ""){
    Data.find({frequency: req.query.frequency}, function(err,result){
      console.log('letter null', result)
      if(err){
        res.json({message:"errorii", detail:err})
      } else {
        res.json(result)
      }
    })
  } else if (req.query.frequency == ""){
    Data.find({letter: req.query.letter}, function(err,result){
      if(err){
        res.json({message:"errorii", detail:err})
      } else {
        res.json(result)
      }
    })
  } else {
    Data.find({letter: req.query.letter, frequency: req.query.frequency}, function(err,result){
      if(err){
        res.json({message:"errorii", detail:err})
      } else {
        res.json(result)
      }
    })
  }
})

module.exports = router
