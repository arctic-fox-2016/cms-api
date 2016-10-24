let mongoose = require('mongoose')
let Schema = mongoose.Schema

let dataSchema = new Schema({
  letter: String,
  frequency: Number
})

let Data = mongoose.model('datas', dataSchema)
module.exports = Data
