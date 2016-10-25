var express = require('express')
var router = express.Router()
var data = require('../models/data')
    /* GET users listing. */
router.put('/data/:id', function(req, res, next) {
    data.findByIdAndUpdate(req.params.id, {
        $set: {
            letter: req.body.letter,
            frequency: req.body.frequency
        }
    }, function(err, doc) {
        if (err) {
            console.log(err)
        } else {
            data.findOne({
                _id: req.params.id
            }, function(err, result) {
                res.json(result)
            })
        }
    })
})

router.delete('/data/:id', function(req, res, next) {
    data.remove({
        _id: req.params.id
    }, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json({
                success: "ok",
                message: "Delete success"
            })
        }
    })
})
router.post('/data', function(req, res, next) {
    let newdata = new data({
        letter: req.body.letter,
        frequency: req.body.frequency
    }).save(function(err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})
module.exports = router;
