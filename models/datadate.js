let mongoose = require('mongoose')
let moment = require('moment')


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
dataDateSchema.methods.toJSON = function() {
    var obj = this.toObject()
    obj.letter = moment(obj.letter).format('YYYY-MM-DD')
    return obj
}
let DataDate = mongoose.model('datadate', dataDateSchema)
module.exports = DataDate
