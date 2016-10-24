// app/routes.js
module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs', {
          title: "CMS Api"
        }); // load the index.ejs file
    });

    app.get('/login', function(req, res) {
        res.render('login_register', {
          title: 'Login',
          type: 1,
          message: req.flash('loginMessage')
        });
    });

    app.get('/register', function(req, res) {
      res.render('login_register', {
        title: 'Register',
        type: 2,
        message: req.flash('loginMessage')
      });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/home',
        failureRedirect : '/register',
        failureFlash : true
    }));

    // =====================================
    // HOME SECTION    =====================
    // =====================================

    app.get('/home', isLoggedIn, function(req, res) {
        res.render('home.ejs', {
            title: 'Home Dashboard',
            user : req.user
        });
    });

    app.get('/data', isLoggedIn, function(req, res) {
        res.render('data.ejs', {
            title: 'Data Dashboard',
            user : req.user
        });
    });

    app.get('/datadate', isLoggedIn, function(req, res) {
        res.render('datadate.ejs', {
            title: 'datadate Dashboard',
            user : req.user
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
