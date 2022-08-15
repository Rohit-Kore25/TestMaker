import { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './ViewQuiz.scss';

const ViewQuiz = () => {
  
  
  const name = useParams().name;

  const navigate = useNavigate();
  
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState(false);
  const [quizObj, setQuizObj] = useState({});

  async function getQuizDetails(){
    let quiz = await fetch(`http://localhost:5000/quiz/${name}`);
    quiz = await quiz.json();
    setQuizQuestions(quiz.RequestedQuiz.quizBody);
    setTitle(quiz.RequestedQuiz.title);
    setStatus(quiz.RequestedQuiz.status);
    setQuizObj(quiz.RequestedQuiz);
  }

  async function setActive(){
    
    quizObj.status = !(quizObj.status);
    console.log(quizObj.status);

    let response = await fetch('http://localhost:5000/setactivity',{
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(quizObj)
    })
  }

  useEffect(() => {
    getQuizDetails()
  },[])
  

  return (
    <div className='ViewQuiz'>
        <center>
        <button onClick={() => navigate('/teacher/')} className='backtoHome'>Home</button>
        </center>
        <div className='quizBodyBackground'>
            <div className='status'><form><button onClick={setActive} style={{backgroundColor:status?'Green':'Red',padding:'5px'}}>{status?'Active':'Inactive'}</button></form></div>
            <div className='rightCornerButtons'>
                <button onClick={() => navigate(`/teacher/makequiz/${title}`)}>Update</button>
            </div>
            <h1 style={{textAlign:'center',color:'purple'}}>{title}</h1>
            {quizQuestions.map((question,idx) => (
                <div key={idx} className='quizQuestion'>
                    <h3>{idx+1}. {question.desc}</h3>
                    <p>a) {question.optionOne}</p>
                    <p>b) {question.optionTwo}</p>
                    <p>c) {question.optionThree}</p>
                    <p>d) {question.optionFour}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ViewQuiz