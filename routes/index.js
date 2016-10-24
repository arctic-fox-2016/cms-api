const express = require('express')
let router = express.Router()

let isAuthenticated = function(req,res,next){
  if(req.session.passport){
    next()
  } else {
    res.redirect('/login')
  }
}

router.get('/test', function(req,res,next){
  res.send('test')
})

router.get('/', function(req,res,next){
  res.render('index.ejs')
})

router.get('/login', function(req,res,next){
  res.render('login.ejs', {message:req.flash('login-message')})
})

router.get('/register', function(req,res,next){
  let pesan = req.flash('register-message')
  res.render('register.ejs',{message:pesan})
})

router.get('/home', isAuthenticated, function(req,res,next){
  res.render('homepage.ejs', {email: req.session.passport.user})
})

router.get('/data', function(req,res,next){
  res.render('data.ejs')
})

router.get('/datadate', function(req,res,next){
  res.render('data-date.ejs')
})

router.get('/bar', function(req,res,next){
  res.render('bar.ejs')
})

router.get('/line', function(req,res,next){
  res.render('line.ejs')
})

router.get('/pie', function(req,res,next){
  res.render('pie.ejs')
})

module.exports = router
