//create new express router
var express = require('express')
var router = express.Router()

//export router

router.get('/', function(req, res, next) {
    res.render('pages/home')
})

router.get('/register', function(req, res, next) {
    res.render('pages/register')
})

module.exports = router
