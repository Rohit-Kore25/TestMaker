//jshint esversion:8
//controllers contain the controlling function contained within the routes
//kind of API functions

const Teacher = require('../model/Teacher.js');
const Student = require('../model/Student.js');
const Quiz = require('../model/Quiz.js');
const Result = require('../model/QuizResult.js');

async function verify(req,res){

  //if selected role is teacher, query the Teachers collection
  if(req.body.role === 'Teacher'){
    let teacher;

    try {
      teacher = await Teacher.findOne({email:req.body.email,password:req.body.password});
    } catch (err) {
      console.log(err);
    }

    if(!teacher){
      return res.status(404).json({message:'Incorrect email ID or password'});
    }else{
      if(teacher.length === 0){
        return res.status(404).json({message:'Incorrect email or password',status:404});
      }else{
        return res.status(200).json({message:'Welcome back Sir!',status:200});
      }
    }
  }
  //else query the Students Collection
  else{
    let student;

    try {
      student = await Student.findOne({email:req.body.email,password:req.body.password});
    } catch (err) {
      console.log(err);
    }

    if(!student){
      return res.status(404).json({message:'Incorrect email ID or password'});
    }else{
      if(student.length === 0){
        return res.status(404).json({message:'Incorrect email or password',status:404});
      }else{
        return res.status(200).json({message:'Welcome back, All the best!',status:200,student:student});
      }
    }
  }

}

//this function is for adding Quiz to Database
async function addQuiz(req,res){
  console.log(req.body);
  let response;

  const quiz = new Quiz({
    title:req.body.title,
    status:req.body.status,
    quizBody:req.body.quizBody,
  });

  try {
    response = await quiz.save();
  } catch (err) {
    console.log(err);
  }

  if(!response){
    return res.status(500).json({message:'An error occured :('});
  }else{
    return res.status(200).json({message:'Quiz Created!'});
  }

}

//this functuin us to get all the quizes!
async function getQuizes(req,res){
  let quizes;

  try {
    quizes = await Quiz.find();
  } catch (err) {
    console.log(err);
  }
  console.log(quizes.length);
  if(quizes.length === 0){
    return res.json({message:'No quizes found',status:404});
  }else{
    return res.json({quizes:quizes,status:200});
  }
}

//function to set a quiz active
async function setActive(req,res){

  const toUpdate = req.body;
  let response;

  try{
    response = await Quiz.findOneAndUpdate({_id:req.body._id},{status:req.body.status},{new:true});
  }catch(err){
    console.log(err);
  }

}

//this function is to get a single quizes
async function getQuiz(req,res){
  let quiz;
  console.log(req.params.name);

  try{
    quiz = await Quiz.findOne({title:req.params.name});
  }catch(err){
    console.log(err);
  }

  return res.json({RequestedQuiz:quiz});
}

//this function is to update a particular quiz
async function updateQuiz(req,res){
  console.log(req.params);
  console.log(req.body);

  const quizBody = req.body.quizBody;

  let response;

  try{
    response = await Quiz.findOneAndUpdate({title:req.body.title},{quizBody:req.body.quizBody},{new:true});
  }catch(err){
    console.log(err);
  }

  if(!response){
    return res.json({message:'an error occured!',status:202});
  }else{
    return res.json({message:'Quiz updated Successfully',status:200});
  }
}

//this function is to delete a quize
async function deleteQuiz(req,res){

  const deleteName = req.params.name;
  let response;

  try{
    response = await Quiz.deleteOne({title:deleteName});
  }catch(err){
    console.log(err);
  }

  if(!response){
    return res.json({message:'deletion failed',status:404});
  }else{
    return res.json({message:'delete Successful!',status:200});
  }
}

//this function is to get all the Students
async function getStudents(req,res){
  let students;

  try{
    students =  await Student.find();
  }catch(err){
    console.log(err);
  }

  if(students.length === 0){
    return res.json({message:'No students found', status:404});
  }else{
    return res.json({students:students,status:200});
  }
}

//this function is to delete a student
async function deleteStudent(req,res){
  const deleteName = req.params.firstName;
  let response;

  try{
    response = await Student.deleteOne({firstName:deleteName});
  }catch(err){
    console.log(err);
  }

  if(!response){
    return res.json({message:'an error occured',status:500});
  }else{
    return res.json({message:'Deletion Successful!',status:200});
  }
}

//this function is to add a students
async function addStudent(req,res){

  let response;
  const student = new Student({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    contact:req.body.contact,
    email:req.body.email,
    password:req.body.password
  });

  try{
    response = await student.save();
  }catch(err){
    console.log(err);
  }

  if(!response){
    return res.json({message:"Something went wrong",status:500});
  }else{
    return res.json({message:"Student added Successfully!",status:200});
  }
}

//this function is to delete all Students
async function deleteAllStudents(req,res){

  try{
    await Student.deleteMany();
  }catch(err){
    console.log(err);
  }

  return res.json({message:'Batch cleared Successfully',status:200});
}

//this function is for adding results of the students to db
async function addStudentResults(req,res){
  console.log(req.body);

  let response;

  try{
    response = await Result.findOneAndUpdate({title:req.body.title},{$push:{studentResults:req.body.studentResult}},{new:true,upsert:true});
  }catch(err){
    console.log(err);
  }

  return res.json({message:'done',status:200});
}

//this function is to get the student results
async function getStudentResults(req,res){
  let results;

  try{
    results = await Result.find();
  }catch(err){
    console.log(err);
  }

  if(results.length === 0){
    return res.json({status:404,message:'No results found'});
  }else{
    return res.json({status:200,results:results});
  }
}

//this function is for deleting a result
async function deleteResult(req,res){
  console.log(req.params.resultTitle);

  let response;

  try{
    response = await Result.deleteOne({title:req.params.resultTitle});
  }catch(err){
    console.log(err);
  }

  if(!response){
    return res.json({message:'an error occured',status:500});
  }else{
    return res.json({message:'Deletion Successful!',status:200});
  }
}

exports.verify = verify;
exports.addQuiz = addQuiz;
exports.getQuizes = getQuizes;
exports.setActive = setActive;
exports.getQuiz = getQuiz;
exports.updateQuiz = updateQuiz;
exports.deleteQuiz = deleteQuiz;
exports.getStudents = getStudents;
exports.deleteStudent = deleteStudent;
exports.addStudent = addStudent;
exports.deleteAllStudents = deleteAllStudents;
exports.addStudentResults = addStudentResults;
exports.getStudentResults = getStudentResults;
exports.deleteResult = deleteResult;
