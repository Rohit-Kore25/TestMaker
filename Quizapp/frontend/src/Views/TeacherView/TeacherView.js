import './Teacherview.scss';
import {useNavigate} from 'react-router-dom';

const TeacherView = () => {
  const navigate = useNavigate();

  return (
    <div className='teacherView'>
        {/* <div className='manageStudents card'>Manage Students</div>
        <div className='viewScores card'>View Scores</div> */}
        <div onClick={() => navigate('/teacher/makequiz/new')} className='makeQuiz card'><h2>Create a Test</h2></div>
        <div onClick={() => navigate('/teacher/managequizzes')} className='viewQuizzes card'><h2>Manage Tests</h2></div>
        <div onClick={() => navigate('/teacher/managestudents')} className='card manageStdents'><h2>Manage Students</h2></div>
        <div onClick={() => navigate('/teacher/viewscores')} className='card'><h2>View Scores</h2></div>
    </div>
  )
}

export default TeacherView