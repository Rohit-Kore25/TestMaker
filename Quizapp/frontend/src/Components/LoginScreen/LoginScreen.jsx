import React, {createContext, useState} from 'react'
import toast, {Toaster} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import './LoginScreen.scss'

const LoginScreen = () => {

    const navigate = useNavigate();

    const [role, setRole] = useState('None');
    const [inputs, setInputs] = useState({email: '', password: ''}) 

    function handleChange(event) {
        setInputs(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    //delay function to show toast
    function delay(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    async function handleSubmit(event) {

        const data = {
            email: inputs.email,
            password: inputs.password,
            role: role
        }

        console.log(data);

        event.preventDefault();
        if (role === 'None') {
            toast.error('Please Enter all the details!');
            return;
        } 

        const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const res = await response.json();

            if (res.status === 200) {

                if(role === 'Teacher'){
                    sessionStorage.setItem('userType', 'teacher');
                    toast.success(res.message);
                    await delay(2000);
                    navigate('/teacher');
                }else if(role === 'Student'){
                    sessionStorage.setItem('userType','student');
                    sessionStorage.setItem('userName',`${res.student.firstName}`);
                    sessionStorage.setItem('lastName',`${res.student.lastName}`);
                    toast.success(`Welcome back ${res.student.firstName} !`);
                    await delay(2000);
                    navigate(`/student`);
                }

                

            } else {
                toast.error(res.message)
                await delay(2000);
            }

    }

    return (
        <div className='loginScreen'>

            <div className='loginWindow'>
                <form onSubmit={handleSubmit}>
                    <div className='loginInput'>
                        <label htmlFor='Email'>Email</label>
                        <input
                            name='email'
                            onChange={handleChange}
                            type='email'
                            placeholder='Email'
                            value={inputs.email}
                            autoComplete='off'></input>
                    </div>
                    <div className='loginInput'>
                        <label htmlFor='Password'>Password</label>
                        <input
                            name='password'
                            onChange={handleChange}
                            type='password'
                            placeholder='Password'
                            value={inputs.password}
                            autoComplete='off'></input>
                    </div>
                    <div className='loginInput'>
                        <label htmlFor='Password'>Select Role</label>
                        <select onChange={(event) => setRole(event.target.value)}>
                            <option
                                value='Select Role'
                                selected="selected"
                                disabled="disabled"
                                hidden="hidden">Select Role</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>
                    <button type='submit' name='submit'>Submit</button>
                    <Toaster
                        toastOptions={{
                            style: {
                                marginTop: '50px'
                            }
                        }}/>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen