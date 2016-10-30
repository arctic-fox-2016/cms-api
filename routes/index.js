let express = require('express');
let router = express.Router();
let passport = require('passport')
let User = require('../models/User')
let helpers = require('../helper/index')
/* GET home page. */

router.get('/login', function(req, res, next){
  res.render('login', { title: 'Login Panel', message : req.flash('loginMessage')});
});

// router.post('/login', passport.authenticate('local-login', {successRedirect : '/home', failureRedirect : '/login', failureFlash : true}));


router.get('/', function(req, res, next) {
  res.render('index', { title: 'cmshacktiv8' });
})
router.get('/data',isLoggedIn, function(req, res, next) {
  res = helpers(res);
  res.render('data', { title: 'Data Entry' });
})
router.get('/datadate',isLoggedIn, function(req, res, next) {
  res = helpers(res);
  res.render('datadate', { title: 'Data Entry' });
})
router.get('/home',isLoggedIn, function(req, res, next) {
  res = helpers(res);
  res.render('home', { title: 'Express' });
})

router.get('/barchart', function(req, res, next) {
  res.render('barchart', { title: 'Barchart With D3Js' });
})

router.post('/login',function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      'enter here on login with passport'
      return res.json({redirect:'/home'})
    });
  })(req, res, next);
});

router.get('/logout',function(req, res) {
  req.logout();
  res.redirect('/login');
})

router.post('/register', function(req, res, next) {

    User.findOne({ email: req.body.email }, function(err, user) {

      if (user) {

        req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
        console.log('user already exist')
        return res.redirect('/login');
      }
    let newuser = new User({
        email : req.body.email
      })
      newuser.password = newuser.generateHash(req.body.password)
      newuser.save(function(err) {
        req.logIn(user, function(err) {
          console.log('ok');
          return res.json({redirect:'/home'})
        })
      })
    })

})

// router.get('/test',function (req,res) {
//     User.findOne({ email: 'sahbanalo@gmail.com' }, function(err, user) {
//       if(!user)      console.log("user = ",user);
//     })
// })

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

module.exports = router;
