//jshint esversion:8
//its the routing module

const express = require('express');
const router = express.Router();
const quizAppController = require('../controller/quizappcontroller');

//All routes here:

//the get section:
router.get("/quizes",quizAppController.getQuizes);
router.get("/quiz/:name",quizAppController.getQuiz);
router.get("/getstudents",quizAppController.getStudents);
router.get("/getresults",quizAppController.getStudentResults);

//the post section:
router.post("/",quizAppController.verify);
router.post("/makequiz",quizAppController.addQuiz);
router.post("/createstudent",quizAppController.addStudent);
router.post("/addresult",quizAppController.addStudentResults);

//the put section:
router.put("/quiz/:name",quizAppController.updateQuiz);
router.put("/setactivity",quizAppController.setActive);

//the delete section
router.delete("/deletequiz/:name",quizAppController.deleteQuiz);
router.delete("/deletestudent/:firstName",quizAppController.deleteStudent);
router.delete("/deleteAllStudents",quizAppController.deleteAllStudents);
router.delete("/deleteresult/:resultTitle",quizAppController.deleteResult);

module.exports = router;
