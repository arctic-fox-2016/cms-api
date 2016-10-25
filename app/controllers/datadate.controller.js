var Model = require('../models/datas')

module.exports = {
  getDataDates: getDataDates,
  postDataDate: postDataDate,
  deleteDataDate: deleteDataDate,
  updateDataDate: updateDataDate
}

function getDataDates(req, res) {
    let query = Model.DataDate.find({});

    if(req.query.letter && req.query.frequency){
        query = Model.DataDate.find({
            $and: [
            {
                letter: {$in: req.query.letter}
            },
            {
                frequency: {$in: req.query.frequency}
            }
            ]
        })
    } else if(req.query.letter){
        query = Model.DataDate.find({
            letter: {$in: req.query.letter}
        })
    } else if(req.query.frequency){
        query = Model.DataDate.find({
            frequency: {$in: req.query.frequency}
        })
    }

    query.exec((err, items) => {
        if (err) res.send(err);
        res.json(items);
    });
}

function postDataDate(req, res) {
    var newData = new Model.DataDate(req.body);
    newData.save((err, item) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: "Data date successfully added!", item });
        }
    });
}

function deleteDataDate(req, res) {
    Model.DataDate.remove({ _id: req.params.id }, (err, result) => {
        res.json({ message: "Data date successfully deleted!", result });
    });
}

function updateDataDate(req, res) {
    Model.DataDate.findById({ _id: req.params.id }, (err, item) => {
        if (err) res.send(err);
        Object.assign(item, req.body).save((err, item) => {
            if (err) res.send(err);
            res.json({ message: 'Data date updated!', item });
        });
    });
}