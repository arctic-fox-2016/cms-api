let mongoose = require('mongoose')



let schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};


var dataSchema = new mongoose.Schema(
  {
      letter: String,
      frequency: Number,
    },schemaOptions
)

let Data = mongoose.model('data', dataSchema)
module.exports = Data
