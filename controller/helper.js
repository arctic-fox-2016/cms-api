let Users = require('../models/users.js')

let isEmailAlreadyUsed = function(email, callback){
  //Email already Exists - check database or use get?
  Users.findOne({email: email}, function(err,result){
    callback(result)
  })
}

let errorsInRegistrationField = function(email, password, confirm_password, callback2){
  let validEmail = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
  let errors = []
  isEmailAlreadyUsed(email, function(result){
    if(result != null){
      errors.push("Email is already used")
      callback2(errors)
    } else {
      //Email
      if(email == ""){
        errors.push("Email cannot be empty")
      } else {
        if(validEmail.test(email)==false){
          errors.push("Please enter a valid email address")
        }
      }

      //Password
      if(password == ""){
        errors.push("Password cannot be empty")
      } else {
        if(confirm_password == ""){
          errors.push("Please confirm your password")
        } else {
          if(password !=confirm_password){
            errors.push("Confirm password field must match password field")
          }
        }
      }
      callback2(errors)
    }
  })
}

module.exports = {errorsInRegistrationField}
