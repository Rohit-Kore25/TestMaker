//jshint esversion:8
//this is the 'Teacher' model

const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  email:String,
  password:String,
});

module.exports = mongoose.model('teacher',teacherSchema);
