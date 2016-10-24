let mongoose = require('mongoose')



let schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};


var dataDateSchema = new mongoose.Schema(
  {
      letter: Date,
      frequency: Number,
    },schemaOptions
)

let DataDate = mongoose.model('data', dataDateSchema)
module.exports = DataDate
