let mongoose = require('mongoose')



let schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};


var dataDateSchema = new mongoose.Schema(
  {
      dateletter: Date,
      frequency: Number,
    },schemaOptions
)

let DataDate = mongoose.model('datadate', dataDateSchema)
module.exports = DataDate
