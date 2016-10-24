const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require("./routes/index.js")
const api = require("./routes/api.js")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const session = require('express-session')
var flash = require('connect-flash');
const passport = require('passport')

mongoose.connect('localhost:27017/testing-cms-1')
app.use(passport.initialize());
app.use(passport.session());
app.use(session({secret:"secret"}))
app.use(flash())
app.use(bodyParser())
app.set('view-engine', 'ejs')
app.use('/public',express.static(__dirname + '/public'))
app.use('/', routes)
app.use('/api', api)

app.listen(port, function(){
  console.log('listening on', port)
})
