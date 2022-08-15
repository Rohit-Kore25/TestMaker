import {useLocation, useNavigate} from 'react-router-dom';
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './Result.scss';

const Result = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const name = sessionStorage.getItem('userName');

    const userMarks = location.state.marks;
    const outOf = location.state.outOf;

    const percentage = (userMarks/outOf)*100;
    



    return (
        <div className='result'>
            <h1
                style={{
                    textAlign: 'center',
                    color: 'white'
                }}>Welcome {name}! Here are your Results:</h1>

                <div className='marksContainer'>
                    {/* <h1>{userMarks}/{outOf}</h1> */}
                    <CircularProgressbar styles={buildStyles({
          textColor: "white",
          pathColor: "green",
          trailColor: "lavender"
        })} value={percentage} text={`${userMarks}/${outOf}`}/>
                </div>
        <center>
        <button onClick={() => navigate('/student')} className='homebtn'>Home</button>
        </center>
        </div>
    )
}

export default Result