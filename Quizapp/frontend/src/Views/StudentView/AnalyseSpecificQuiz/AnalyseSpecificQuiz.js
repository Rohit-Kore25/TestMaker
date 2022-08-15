import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './AnalyseSpecificQuiz.scss'

const AnalyseSpecificQuiz = () => {
    
    const navigate = useNavigate();
    const quizName  = useParams().quizName;
    const location = useLocation();
    const studentResponse = location.state.studentResponse;

    const [quizQuestions, setQuizQuestions] = useState([])

    async function getQuiz(){
        let response = await fetch(`http://localhost:5000/quiz/${quizName}`);
        response = await response.json();
        setQuizQuestions(response.RequestedQuiz.quizBody);
    }

    useEffect(() => {
      getQuiz()
    }, [])
    

    return (
    <div className='AnalyseSpecificQuiz'>
        <h1 style={{textAlign:'center',color:'white'}}>{quizName}</h1>
    <div className='quizBackground'>
    
        {quizQuestions.map((question,idx) => (
            <div key={idx} className='quizQuestion'>
                <h3>{idx+1}. {question.desc}</h3>
                <p style={{backgroundColor:(question.optionOne === question.answer)?((question.optionOne === studentResponse[idx])?'greenyellow':'lime'):(studentResponse[idx] === question.optionOne)?'orange':''}}>a) {question.optionOne}</p>
                <p style={{backgroundColor:(question.optionTwo === question.answer)?((question.optionTwo === studentResponse[idx])?'greenyellow':'lime'):(studentResponse[idx] === question.optionTwo)?'orange':''}}>b) {question.optionTwo}</p>
                <p style={{backgroundColor:(question.optionThree === question.answer)?((question.optionThree === studentResponse[idx])?'greenyellow':'lime'):(studentResponse[idx] === question.optionThree)?'orange':''}}>c) {question.optionThree}</p>
                <p style={{backgroundColor:(question.optionFour === question.answer)?((question.optionFour === studentResponse[idx])?'greenyellow':'lime'):(studentResponse[idx] === question.optionFour)?'orange':''}}>d) {question.optionFour}</p>
            </div>
        ))}
    </div>
    <center>
    <button onClick={() => navigate('/student')} className='homebtn'>Home</button>
    </center>
    </div>)
}

export default AnalyseSpecificQuiz