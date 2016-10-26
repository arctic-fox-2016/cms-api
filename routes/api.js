var express = require('express')
var router = express.Router()
var data = require('../models/data')
var datadate = require('../models/datadate')
    /* GET users listing. */

    router.get('/datadate', function(req, res, next) {
        datadate.find({}, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                    res.json(result)
            }
        })
    })
    router.post('/datesearch', function(req, res, next) {
      if(req.body.letter != "" && req.body.frequency != ""){
        console.log('go 1',req.body.letter,req.body.frequency)
        datadate.find({
          $and: [{letter: {$in:req.body.letter}}, {frequency: {$in:req.body.frequency}}]

        }, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                    res.json(result)
            }
        })
      } else if(req.body.letter != "" && req.body.frequency === ""){
        console.log('go 2',req.body.letter)
        datadate.find({
          letter: {$in:req.body.letter}
        }, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                    res.json(result)
            }
        })
      } else if(req.body.letter === "" && req.body.frequency != ""){
        console.log('go 3',req.body.frequency)
        datadate.find({
          frequency: {$in:req.body.frequency}
        }, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                    res.json(result)
            }
        })
      } else if(req.body.letter === "" && req.body.frequency === ""){
        console.log('go 4')
        datadate.find({}, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                    res.json(result)
            }
        })
      }
    })

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
// Data Date api
router.put('/datadate/:id', function(req, res, next) {
    datadate.findByIdAndUpdate(req.params.id, {
        $set: {
            letter: req.body.letter,
            frequency: req.body.frequency
        }
    }, function(err, doc) {
        if (err) {
            console.log(err)
        } else {
            datadate.findOne({
                _id: req.params.id
            }, function(err, result) {
                res.json(result)
            })
        }
    })
})

router.delete('/datadate/:id', function(req, res, next) {
    datadate.remove({
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
router.post('/datadate', function(req, res, next) {
    let newdatadate = new datadate({
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
