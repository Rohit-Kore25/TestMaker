import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './ManageQuiz.scss'

const ManageQuiz = () => {
  
  const navigate = useNavigate();

  const [quizes, setQuizes] = useState([]);
  const [showQuizList, setShowQuizList] = useState(true);

  async function getQuizes(){
    let response = await fetch('http://localhost:5000/quizes');
    response = await response.json();
    if(response.message === 'No quizes found'){
        setShowQuizList(false);
        return;
    }
    console.log(response.quizes);
    setQuizes([...response.quizes]);
  }

  async function setActive(event){
    
    const toUpdate = quizes[event.target.id];
    toUpdate.status = !(toUpdate.status);
    
    let response = await fetch('http://localhost:5000/setactivity',{
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(toUpdate)
    })
    
  }

  function viewQuiz(event){
    console.log(event.target.id);
    navigate(`/teacher/viewquiz/${event.target.id}`)
  }

  async function deleteQuiz(event){
    
    const nameToDelete = quizes[event.target.id].title;

    await fetch(`http://localhost:5000/deletequiz/${nameToDelete}`,{
      method:'DELETE',
    })
    
  }

  useEffect(() => {
   getQuizes();
  },[])
  
  

  return (
    <div className='viewQuiz'>
        <center>
        <h1 style={{color:'white'}}>{quizes.length?'Manage Tests:':'No Tests at the moment :('}</h1>
        {showQuizList?<><div className='quizList'>
           {quizes.map((quiz,idx) => (
            <div className='quizTitle'  key = {idx}>
            <h3 id={quiz.title} onClick={viewQuiz}>{quiz.title}</h3>
            <form>
            <button className='activityButton' onClick={setActive} style={{backgroundColor:quiz.status?'Green':'red'}} id = {idx}>{quiz.status?'Active':'Not Active'}</button>
            <button id={idx} onClick={deleteQuiz} className='deleteQuizButton'>Delete Quiz</button>
            </form>
            </div>
           ))}
           
        </div><button  onClick={() => navigate('/teacher/makequiz/new')} className='addQuiz'>Add another Test</button></>:<div>
        <button onClick={() => navigate('/teacher/makequiz/new')} className='addQuiz'>Add a Test</button>
        </div>
        }
        <button className='backtohomebtn' onClick={() => navigate('/teacher')}>Home</button>
        </center>
    </div>
  )
}

export default ManageQuiz









