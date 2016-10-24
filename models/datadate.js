let mongoose = require('mongoose')
let Schema = mongoose.Schema
let moment = require('moment')

let datadateSchema = new Schema({
  letter: Date,
  frequency: Number
})

datadateSchema.methods.toJSON = function(){
  var obj = this.toObject()
  obj.letter = moment(obj.letter).format('YYYY-MM-DD')
  return obj
}

let Datadate = mongoose.model('datadates', datadateSchema)
module.exports = Datadate
