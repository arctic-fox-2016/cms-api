let mongoose = require('mongoose')
mongoose.connect('localhost: 27017/testing-cms-1')
let datadate = require('./models/datadate')
let fs = require('fs')
let json = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'))

datadate.collection.insert(json, function(err){
  if(err){
    console.log(err);
    process.exit(1);
  }
  console.log("Seed Completed");
  process.exit();
})
