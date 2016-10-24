let mongoose = require('mongoose')
let Schema = mongoose.Schema

let usersSchema = new Schema({
  email: String,
  password: String
})

usersSchema.methods.validPassword = function(password){
  if(this.password == password){
    return true
  } else {
    return false
  }
}

let Users = mongoose.model('users', usersSchema)
module.exports = Users
