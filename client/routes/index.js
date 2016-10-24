//create new express router
var express = require('express')
var router = express.Router()

//export router

router.get('/', function(req, res, next) {
    res.render('pages/home')
})

router.get('/items', function(req, res, next) {
    res.render('pages/items')
})

module.exports = router
