//jshint esversion:8
//this is the 'Quiz' model

const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title:String,
  status:Boolean,
  quizBody:[mongoose.Schema.Types.Mixed]
});

module.exports = new mongoose.model('quiz',quizSchema);
