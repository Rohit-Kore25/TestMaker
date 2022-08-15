import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AttemptQuiz.scss';

const AttemptQuiz = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const fname = sessionStorage.getItem('userName');
    const lname = sessionStorage.getItem('lastName');
    
    const [questions, setQuestions] = useState(location.state.quizQuestions);
    const [responses, setResponses] = useState([]);
    const [showQuiz, setShowQuiz] = useState(true);

    useEffect(() => {
        
        checkHasGivenTest();

        for(var i = 0; i < questions.length; i++){
            responses.push('NULL')
        }

        console.log(responses);
    }, [])
    

    function handleOptions(event){
        const id = event.target.id;
        const name = event.target.className;
        
        responses[id] = name;
        console.log(responses);
    }

    async function submitQuiz(event){

        event.preventDefault();

        let marks = 0;
        for(var i = 0; i < questions.length; i++){
            if(questions[i].answer === responses[i]){
                marks++;
            }
        }
        
        console.log('hi');

        const result = {
            title:location.state.quizTitle,
            studentResult:{
                firstName:sessionStorage.getItem('userName'),
                lastName:sessionStorage.getItem('lastName'),
                studentResponse:responses,
                result:marks.toString()+"/"+questions.length.toString()
            }
        }

        console.log('Hello');

        let response = await fetch('http://localhost:5000/addresult',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(result)
        })
        
        navigate('/student/result',{state:{marks:marks,outOf:questions.length}})
    }

    async function checkHasGivenTest(){
        let response = await fetch('http://localhost:5000/getresults');
        response = await response.json()

        
        
        if(response.status !== 404){
        const result = response.results;
        for(var i = 0; i < result.length; i++){
            if(result[i].title === location.state.quizTitle){
                console.log(result[i].title);
                let subResults = result[i].studentResults;
                for(var j = 0; j < subResults.length; j++){
            
                    if(subResults[j].firstName === fname && subResults[j].lastName === lname){ 
                        setShowQuiz(false);
                        break;
                    }
                }
            }
        }
    }
        console.log(response);
    }

    

    console.log(responses);

    return (showQuiz ? <div className='attemptQuiz'>
        <h2 style={{textAlign:'center',color:'white'}}>{location.state.quizTitle}</h2>
        <form onSubmit={submitQuiz}>
        <div className='attemptQuizBody'>
        
        {questions.map((question,idx) => (

            <div key={idx} className='quizQuestion'>
                <h3 style={{marginBottom:'9px'}}>{idx+1}. {question.desc}</h3>
                
                <div className='quizInputOption'>
                <input className={question.optionOne} id={idx} onClick={handleOptions} name={idx} type={'radio'}></input>
                <label>{question.optionOne}</label>
                </div>

                <div className='quizInputOption'>
                <input className={question.optionTwo} id={idx} onClick={handleOptions} name={idx} type={'radio'}></input>
                <label>{question.optionTwo}</label>
                </div>

                <div className='quizInputOption'>
                <input className={question.optionThree} id={idx} onClick={handleOptions} name={idx} type={'radio'}></input>
                <label>{question.optionThree}</label>
                </div>

                <div className='quizInputOption'>
                <input className={question.optionFour} id={idx} onClick={handleOptions} name={idx} type={'radio'}></input>
                <label>{question.optionFour}</label>
                </div>

            </div>
           
        ))}
        </div>
        <center>
        <button type='submit' className='submitQuiz'>Submit</button>
        </center>
        </form>
    </div>:<center><h1 style={{textAlign:'center',color:'red',backgroundColor:'white',padding:'8px',maxWidth:'fit-content',fontFamily:'sans-serif'}}>You have already given this Test!</h1>
    <button onClick={() => navigate('/student')} className='homebtn'>Home</button></center>)
}

export default AttemptQuiz