import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnalyseQuizes.scss'

const AnalyseQuizes = () => {

    const navigate = useNavigate();

    const [givenQuizes, setGivenQuizes] = useState([])
    const [results, setResults] = useState([])
    const fname = sessionStorage.getItem('userName');
    const lname = sessionStorage.getItem('lastName');

    async function getStudentResults(){
        let response;
        response = await fetch('http://localhost:5000/getresults');
        response = await response.json();

        let results = response.results;
        if(results === undefined){
            return;
        }
        setResults(results);

        for(let i = 0; i < results.length; i++){
            let studentResults = results[i].studentResults;
            for(let j = 0; j < studentResults.length; j++){
                if(studentResults[j].firstName === fname && studentResults[j].lastName === lname){
                    setGivenQuizes(prev => ([...prev,results[i].title]))
                }
            }

        }
        console.log(results);
    }

    function viewQuiz(event){
        const quizName = event.target.id;
        let studentResponse;
        
        for(let i = 0; i < results.length; i++){
            if(results[i].title === quizName){
                let studentResults = results[i].studentResults;
                for(let j = 0; j < studentResults.length; j++){
                    if(studentResults[j].firstName === fname && studentResults[j].lastName === lname){
                        studentResponse = studentResults[j].studentResponse;
                    }
                }
            }
        }
        navigate(`${quizName}`,{state:{studentResponse:studentResponse}});
    }

    useEffect(() => {
        getStudentResults();
    }, [])
    

    return (<div className='analyseQuizes'>
        <center>
        <h1 style={{color:'white'}}>Attempted Quizes:</h1>
        <div className='givenQuizList'>
        {givenQuizes.map((givenQuiz,idx) => (
            <div onClick={viewQuiz} key={idx} id={givenQuiz} className='givenQuiz'><h3 id={givenQuiz}>{givenQuiz}</h3></div>
        ))}
        </div>
        <button onClick={() => navigate('/student')} className='homebtn'>Home</button>
        </center>
    </div>)
}

export default AnalyseQuizes