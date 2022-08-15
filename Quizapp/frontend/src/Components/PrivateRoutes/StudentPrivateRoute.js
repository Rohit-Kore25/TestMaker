import React, {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

const StudentPrivateRoute = ({Component,URL}) => {

    const navigate = useNavigate();

    useEffect(() => {
        let loggedInAs = sessionStorage.getItem('userType');
        console.log(loggedInAs);
        if(loggedInAs !== 'student'){
            navigate('/');
        }
    }, [])

    return (<div><Component/></div>);
}

export default StudentPrivateRoute