var mongoose = require('mongoose');

var dataDateSchema = mongoose.Schema({
    date : Date,
    frequency : Number
});

module.exports = mongoose.model('DataDate', dataDateSchema);
