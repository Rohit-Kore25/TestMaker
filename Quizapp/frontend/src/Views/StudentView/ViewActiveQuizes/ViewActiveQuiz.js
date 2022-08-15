import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import './ViewActiveQuiz.scss'

const ViewActiveQuiz = () => {

    const navigate = useNavigate();

    const [quizes, setQuizes] = useState([]);
    async function getQuizes() {
        let response = await fetch('http://localhost:5000/quizes');
        response = await response.json();
        console.log(response);
        setQuizes(response.quizes);
        
    }

    useEffect(() => {
        getQuizes();
    }, [])

    return (
        <div className='viewActiveQuiz'>
            <h1
                style={{
                    textAlign: 'center',
                    color: 'white'
                }}>Available Tests:</h1>
            <div className='activeQuizBody'>
                {
                    quizes.map((quiz, idx) => (
                        quiz.status && <center key={idx}>
                            <div
                                onClick={() => navigate(`/student/attempt`, {
                                    state: {
                                        quizTitle: quiz.title,
                                        quizQuestions: quiz.quizBody
                                    }
                                })}
                                id={quiz.title}
                                className='quiz'>
                                <h3>{quiz.title}</h3>
                            </div>
                        </center>
                    ))
                }
            </div>
            <center>
            <button onClick={() => navigate('/student')} className='homebtn'>Home</button>
            </center>
        </div>
    )
}

export default ViewActiveQuiz