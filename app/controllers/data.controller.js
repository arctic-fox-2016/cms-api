var Model = require('../models/datas')

module.exports = {
  getDatas: getDatas,
  postData: postData,
  deleteData: deleteData,
  updateData: updateData
}

function getDatas(req, res) {
    let query = Model.Data.find({});

    if(req.query.letter && req.query.frequency){
        query = Model.Data.find({
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
        query = Model.Data.find({
            letter: {$in: req.query.letter}
        })  
    } else if(req.query.frequency){
        query = Model.Data.find({
            frequency: {$in: req.query.frequency}
        })
    }

    query.exec((err, items) => {
        if (err) res.send(err);
        res.json(items);
    });
}

function postData(req, res) {
    var newData = new Model.Data(req.body);
    newData.save((err, item) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: "Data successfully added!", item });
        }
    });
}

function deleteData(req, res) {
    Model.Data.remove({ _id: req.params.id }, (err, result) => {
        res.json({ message: "Data successfully deleted!", result });
    });
}

function updateData(req, res) {
    Model.Data.findById({ _id: req.params.id }, (err, item) => {
        if (err) res.send(err);
        Object.assign(item, req.body).save((err, item) => {
            if (err) res.send(err);
            res.json({ message: 'Data updated!', item });
        });
    });
}