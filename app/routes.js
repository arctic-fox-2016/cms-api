const mainController = require('./controllers/main.controller'),
dataController = require('./controllers/data.controller'),
dataDateController = require('./controllers/datadate.controller')

module.exports = function(app, passport) {

    // ===========================
    // USER REGISTRATION AND HOME
    // ===========================
    app.get('/', mainController.showIndex)
    app.get('/line-chart', mainController.showLineChart)
    app.get('/pie-chart', mainController.showPieChart)
    app.get('/bar-chart', mainController.showBarChart)

    app.get('/login', mainController.showLogin)
    app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/home',
        successFlash: true,
		failureRedirect: '/login',
		failureFlash   : true
    }))
    app.get('/signup', mainController.showSignup)
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home',
        successFlash: true,
        failureRedirect: '/signup',
        failureFlash   : true
    }))
    app.get('/home', isLoggedIn, mainController.showHome)
    app.get('/logout', mainController.logout)

    // ===========================
    // DATA API
    // ===========================
    app.get('/api/data', dataController.getDatas)
    app.post('/api/data', dataController.postData)
    app.delete('/api/data/:id', dataController.deleteData)
    app.put('/api/data/:id', dataController.updateData)

    // ===========================
    // DATA DATE API
    // ===========================
    app.get('/api/datadate', dataDateController.getDataDates)
    app.post('/api/datadate', dataDateController.postDataDate)
    app.delete('/api/datadate/:id', dataDateController.deleteDataDate)
    app.put('/api/datadate/:id', dataDateController.updateDataDate)
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()

    res.redirect('/')
}
