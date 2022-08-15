import { useLocation, useNavigate } from 'react-router-dom';
import './StudentView.scss';

const StudentView = () => {

  const navigate = useNavigate();

  const name = sessionStorage.getItem('userName');

  return (
    <div className='studentView'>
      <h1 style={{color:'white'}}>All the best {name}!</h1>
      <div onClick={() => navigate('/student/viewtests')} className='availableQuiz card'>View Tests</div>
      <div onClick={() => navigate('/student/analyse')} className='card analyse'>Analyse</div>
    </div>
  )
}

export default StudentView