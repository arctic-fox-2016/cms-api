let express = require('express');
let router = express.Router();
let passport = require('passport')
let User = require('../models/User')
/* GET home page. */

router.get('/login', function(req, res, next){
  res.render('login', { title: 'Login Panel', message : req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {successRedirect : '/home', failureRedirect : '/login', failureFlash : true}));


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.get('/home',isLoggedIn, function(req, res, next) {
  res.render('home', { title: 'Express' });
})

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
})

router.post('/register', function(req, res, next) {
    console.log('enter register, email = ', req.body.email);
    console.log('enter register, password = ', req.body.password);

    User.findOne({ email: req.body.email }, function(err, user) {

      if (user) {

        req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
        console.log('user already exist')
        return res.redirect('/login');
      }
      user = new User({
      });
      user.email = req.body.email,
      user.password = generateHash(req.body.password)
      user.save(function(err) {
        req.logIn(user, function(err) {
          console.log('ok');
          res.redirect('/home');
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
