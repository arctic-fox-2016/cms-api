var express        = require('express'),
	app            = express(),
	port           = process.env.PORT || 8080,
	mongoose       = require('mongoose'),
	passport       = require('passport'),
	flash          = require('connect-flash'),
	
	cookieParser   = require('cookie-parser'),
	bodyParser     = require('body-parser'),
	session        = require('express-session'),
	expressLayouts = require('express-ejs-layouts')

mongoose.connect("mongodb://localhost/cms-api") //insert database here

require('./app/helpers/passport')(passport)

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))

//passport stuff
app.use(session({ secret: 'wkwkwkwk' })) 
app.use(passport.initialize())
app.use(passport.session()) //persistent login sessions
app.use(flash())

require('./app/routes.js')(app,passport)

app.listen(port)
console.log('ya udah jalan di port ' + port)