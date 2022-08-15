//jshint esversion:8
//this is the 'Student' model

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName:String,
  lastName:String,
  contact:String,
  email:String,
  password:String
});

module.exports = new mongoose.model('student',studentSchema);
