import './ViewScores.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewScores = () => {

    const navigate = useNavigate();

    const [results, setResults] = useState([]);

    async function getStudentResults() {
        let response = await fetch('http://localhost:5000/getresults');
        response = await response.json();

        if(response.results !== undefined){
            setResults(response.results);
        }
        
        console.log(response);
    }

    async function deleteResults(event){
        console.log(event.target.id);

        await fetch(`http://localhost:5000/deleteresult/${event.target.id}`,{
            method:'DELETE'
        });
    }

    useEffect(() => {
      getStudentResults()
      console.log(results);
    }, [])
    

    return (
        <>
        <h1 style={{textAlign:'center',padding:'9px',color:'crimson',backgroundColor:'white',maxWidth:'fit-content',marginLeft:'auto',marginRight:'auto',borderRadius:'9px'}}>Test wise Results</h1>
        <div className='viewScores'>
            {results.map((result,indx) => (
                <div key={indx} className='scoreCard'>
                    <h1>{result.title}</h1>
                    {result.studentResults.map((studentResult,idx) =>(
                        <div key={idx} className='studentResult'>
                            <h3 style={{marginRight:'10px'}}>{idx+1}. {studentResult.firstName} {studentResult.lastName}</h3>
                            <h3 style={{color:'yellow'}}>{studentResult.result}</h3>
                        </div>
                    ))}
                    <form>
                    <center>
                <button onClick={deleteResults} id={result.title} className='deleteResultbtn'>Delete</button>
                </center>
                </form>
                </div>
            ))}
            
        </div>
        <center>
            <button onClick={()=>navigate('/teacher')} className='homebtn'>Home</button>
        </center>
        </>
    )
}

export default ViewScores