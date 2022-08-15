//jshint esversion:8
//this collection is to store the respective quiz and their results

const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  title:String,
  studentResults:[{firstName:String,lastName:String,result:String,studentResponse:[String]}]
});

module.exports = new mongoose.model('result',resultSchema);
