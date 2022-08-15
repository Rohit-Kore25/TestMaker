import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentView from './Views/StudentView/StudentView';
import TeacherView from './Views/TeacherView/TeacherView';
import MakeQuiz from './Views/TeacherView/MakeQuiz/MakeQuiz'
import ManageQuiz from './Views/TeacherView/ManageQuiz/ManageQuiz';
import ViewQuiz from './Views/TeacherView/ViewQuiz/ViewQuiz';
import ManageStudent from './Views/TeacherView/ManageStudents/ManageStudent';
import TeacherPrivateRoute from './Components/PrivateRoutes/TeacherPrivateRoute';
import StudentPrivateRoute from './Components/PrivateRoutes/StudentPrivateRoute';
import ViewActiveQuiz from './Views/StudentView/ViewActiveQuizes/ViewActiveQuiz';
import AttemptQuiz from './Views/StudentView/AttemptQuiz/AttemptQuiz';
import Result from './Views/StudentView/Result/Result';
import ViewScores from './Views/TeacherView/ViewScores/ViewScores';
import AnalyseQuizes from './Views/StudentView/AnalyseQuizes/AnalyseQuizes';
import AnalyseSpecificQuiz from './Views/StudentView/AnalyseSpecificQuiz/AnalyseSpecificQuiz';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  
  
    <BrowserRouter>
    <Routes>
      <Route  path='/' element = {<App/>}></Route>
      <Route  path='/teacher' element = {<TeacherPrivateRoute URL = '/teacher' Component = {TeacherView}/>}/>
      <Route  path='/teacher/makequiz/:quizID' element = {<TeacherPrivateRoute URL='/teacher' Component={MakeQuiz}/>}></Route>
      <Route path='/teacher/managequizzes' element={<TeacherPrivateRoute URL='/teacher/managequizzes' Component={ManageQuiz}/>}></Route>
      <Route path='/teacher/viewquiz/:name' element = {<TeacherPrivateRoute URL='/teacher' Component={ViewQuiz}/>}></Route>
      <Route path='/teacher/managestudents' element = {<TeacherPrivateRoute URL='/teacher/managestudents' Component={ManageStudent}/>}></Route>
      <Route path='/teacher/viewscores' element={<TeacherPrivateRoute URL='/teacher/viewscores' Component={ViewScores}/>}></Route>
    </Routes>

    <Routes>
      <Route  path='/student' element = {<StudentPrivateRoute  Component={StudentView}/>}/>
      <Route exact path='/student/viewtests' element={<StudentPrivateRoute Component={ViewActiveQuiz}/>}></Route>
      <Route exact path='/student/attempt' element = {<StudentPrivateRoute Component={AttemptQuiz}/>}></Route> 
      <Route path='/student/result' element = {<StudentPrivateRoute Component={Result}/>}></Route>
      <Route path='/student/analyse' element = {<StudentPrivateRoute Component={AnalyseQuizes}/>}></Route>
      <Route path='/student/analyse/:quizName' element = {<StudentPrivateRoute Component={AnalyseSpecificQuiz}/>}></Route>
    </Routes>
    
    </BrowserRouter>
    
  
);

