//jshint esversion:8

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/quizAppRoutes.js');

const app = express();
app.use(express.json());
app.use(cors());

const password = process.env.PASSWORD;

const url = "mongodb+srv://RohitKore1425:"+ password +"@cluster0.qka5f.mongodb.net/QuizApp?retryWrites=true&w=majority";

mongoose.connect(url,function(err){
  if(!err){
    console.log('Database Connected Successfully!');
  }else{
    console.log(err);
  }
});

app.use("/",router);

app.listen(process.env.PORT || 5000,function(){
  console.log('Server started on port 5000');
});
