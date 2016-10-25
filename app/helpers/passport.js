var LocalStrategy = require('passport-local').Strategy,
    Model         = require('../models/datas')

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        Model.User.findById(id, function(err, user) {
            done(err, user)
        })
    })

    passport.use('local-signup', new LocalStrategy({
            usernameField    : 'email',
            passwordField    : 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            process.nextTick(function() {
                Model.User.findOne({ 'email': email }, function(err, user) {
                    if (err)
                        return done(err)

                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'Email has been registered!'))
                    } else {

                        var newUser = new Model.User()
                        
                        newUser.email    = email
                        newUser.password = newUser.generateHash(password)

                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            return done(null, newUser, true, req.flash('successMessage', `Account ${newUser.email} is registered!`))
                        })
                    }
                })
            })
        }))

    passport.use('local-login', new LocalStrategy({
            usernameField    : 'email',
            passwordField    : 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            Model.User.findOne({ 'email': email }, function(err, user) {
                if (err)
                    return done(err)

                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Username not found!'))

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Password is wrong!'))

                return done(null, user, true, req.flash('successMessage', `Welcome ${user.email}!`))
            })
        }))
}
