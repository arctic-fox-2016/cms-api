var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var dateSchema = mongoose.Schema({
    letter:Date,
    freq:Number,
    dtCreated:Date
})

module.exports= mongoose.model('dates', dateSchema)
