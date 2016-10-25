var mongoose = require('mongoose'),
bcrypt       = require('bcrypt-nodejs'),
moment = require('moment')

var userSchema = mongoose.Schema({
	email   : String,
	password: String
}, { collection: 'users' })

var dataSchema = mongoose.Schema({
	letter   : String,
	frequency: Number
}, { collection: 'datas' })

var dataDateSchema = mongoose.Schema({
	letter   : Date,
	frequency: Number
}, { collection: 'datadates' })

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

dataDateSchema.methods.toJSON = function() {
    var obj = this.toObject()
    obj.letter = moment(obj.letter).format('YYYY-MM-DD')
    return obj
};

var User = mongoose.model('User', userSchema)
var Data = mongoose.model('Data', dataSchema)
var DataDate = mongoose.model('DataDate', dataDateSchema)

module.exports = { User, Data, DataDate }