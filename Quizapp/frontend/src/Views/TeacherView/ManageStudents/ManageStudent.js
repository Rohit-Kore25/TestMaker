import {useEffect, useState} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './ManageStudent.scss';

const ManageStudent = () => {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [showAddOptions, setShowAddOptions] = useState(false);
    const [studentData, setStudentData] = useState({
        firstName:'',
        lastName:'',
        contact:'',
        email:'',
        password:''
    })

    function delay(milliseconds){
        return new Promise(
            (resolve) => setTimeout(resolve,milliseconds)
        );
    }

    function handleChange(event){
        console.log(event.target.name);
        setStudentData(prev => ({
            ...prev,
            [event.target.name]:event.target.value
        }))
    }

    async function getStudents() {
        let response = await fetch('http://localhost:5000/getstudents');
        response = await response.json();
        if(response.status !== 404){
            setStudents(response.students);
        }
        
    }

    async function deleteStudent(event) {
        await fetch(
            `http://localhost:5000/deletestudent/${event.target.id}`,
            {method: 'DELETE'}
        );
    }

    async function addStudent(event){
        
        if(studentData.firstName !== '' && studentData.lastName !== '' && studentData.contact !== '' && studentData.email !== '' && studentData.password !== ''){
            let response = await fetch('http://localhost:5000/createstudent',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(studentData)
            })

            response = await response.json();

            if(response.status === 200){
                toast.success("Student Added!");
                await delay(3400);
                setShowAddOptions(!showAddOptions);
                setStudentData({
                    firstName:'',
                    lastName:'',
                    contact:'',
                    email:'',
                    password:''
                })
            }else{
                toast.error(response.message);
                await delay(3400);
            }
            
            
        }else{
            event.preventDefault();
            toast.error('please fill all the details');
        }
        console.log(studentData);
        
    }

    async function deleteAllStudents(event){
        await fetch('http://localhost:5000/deleteAllStudents',{
            method:'DELETE'
        })
        toast.success('Batch cleared!')
        delay(3400);
    }

    useEffect(() => {
        getStudents();
    }, [])

    return (
        <div className='manageStuds'>
            <h1
                style={{
                    textAlign: 'center',
                    color: 'white'
                }}>{students.length >=1?'Manage Students':'No Students in Batch, Try Adding One'}</h1>
             {students.length >= 1 && <div className='StudentsList'>
                {
                    students.map((student, idx) => (
                        <div key={idx} className='student'>
                            <h3>{idx + 1}) {student.firstName}{'  '} 
                                {student.lastName}</h3>
                            <form>
                                <button onClick={deleteStudent} id={student.firstName} className='delbtn'>Delete</button>
                            </form>
                        </div>
                    ))
                }
            </div>}

            {showAddOptions && <div>
               <div className='addStudent'>
                <form onSubmit={addStudent}>
                    <div className='StudentInput'>
                        <label htmlFor='firstName'>First Name</label>
                        <input autoComplete='off' value={studentData.firstName} onChange={handleChange} name='firstName' type='text'></input>
                    </div>

                    <div className='StudentInput'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input autoComplete='off' value={studentData.lastName} onChange={handleChange} name='lastName' type='text'></input>
                    </div>

                    <div className='StudentInput'>
                        <label htmlFor='contact'>Contact</label>
                        <input autoComplete='off' value={studentData.contact} onChange={handleChange} name='contact' type='text'></input>
                    </div>

                    <div className='StudentInput'>
                        <label htmlFor='email'>Email</label>
                        <input autoComplete='off' value={studentData.email} onChange={handleChange} name='email' type='email'></input>
                    </div>

                    <div className='StudentInput'>
                        <label htmlFor='password'>Password</label>
                        <input autoComplete='off' value={studentData.password} onChange={handleChange} name='password' type='password'></input>
                    </div>
                    <center>
                    <button  className='addStudbtn'>Add Student</button>
                    </center>
                </form>
                </div>
                <center>
                <button className='cancel' onClick={() => setShowAddOptions(!showAddOptions)}>Cancel</button>
                </center>
            </div>}


            {
                !showAddOptions && <button
                        onClick={() => setShowAddOptions(!showAddOptions)}
                        className='addStudbtn'>Add Student</button>
            }

            {students.length >= 1 && <form>
                <center>
                <button onClick={deleteAllStudents} className='clearBatch'>Clear Batch</button>
                </center>
            </form>}

            <button onClick={() => navigate('/teacher')} className='homebtn'>Home</button>

            <Toaster toastOptions={{
                style:{
                    marginTop:'57px',
                    backgroundColor:'black',
                    color:'white'
                }
            }}/>
        </div>
    )
}

export default ManageStudent