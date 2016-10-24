var express = require('express')
var path = require('path')
var ejs = require('ejs')
var app = express()
var port = process.env.PORT || 9000;

// view engine setup
app.set('view engine', 'ejs');

app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'))

app.listen(port);
console.log('The magic happens on port ' + port);
