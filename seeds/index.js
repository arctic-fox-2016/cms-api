const fs = require('fs');
const mongoose = require('mongoose');
const DataDate = require('../models/datadate');

mongoose.connect('mongodb://localhost/cms-api');

var list = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'))

for(var i = 0; i < list.length; i++){
  list[i].letter = new Date(list[i].letter)
}

DataDate.create(list, function(err){
  if(err){
    console.log(err);
    process.exit(1);
  }
  console.log("Seed Completed");
  process.exit();
})
