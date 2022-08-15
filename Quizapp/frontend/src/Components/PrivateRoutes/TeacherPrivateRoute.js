import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const TeacherPrivateRoute = ({Component,URL}) => {

    const navigate = useNavigate();

    useEffect(() => {
        let loggedInAs = sessionStorage.getItem('userType');
        console.log(loggedInAs);
        if (loggedInAs === 'teacher') {
            navigate(URL);
        }else{
            navigate('/');
        }
    }, [])

    return (<div><Component/></div>);
}

export default TeacherPrivateRoute