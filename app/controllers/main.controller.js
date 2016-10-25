  module.exports = {
      showIndex: showIndex,
      showLineChart: showLineChart,
      showPieChart: showPieChart,
      showBarChart: showBarChart,
      showLogin: showLogin,
      showSignup: showSignup,
      showHome: showHome,
      logout: logout
  }

  function showIndex(req, res) {
      res.render('pages/index')
  }

  function showLineChart(req, res) {
      res.render('pages/linechart',{layout:'chartlayout'})
  }

  function showPieChart(req, res) {
      res.render('pages/piechart',{layout:'chartlayout'})
  }

  function showBarChart(req, res) {
      res.render('pages/barchart',{layout:'chartlayout'})
  }

  function showLogin(req, res) {
      res.render('pages/login', { message: req.flash('loginMessage') })
  }

  function showSignup(req, res) {
      res.render('pages/signup', { message: req.flash('signupMessage') })
  }

  function showHome(req, res) {
      res.render('pages/home', {
          user: req.user,
          message: req.flash('successMessage')
      })
  }

  function logout(req, res) {
      req.logout()
      res.redirect('/')
  }
