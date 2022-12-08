import React, { useEffect, useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { useAuth } from '../auth'
import Course from '../components/Course'
import { Modal, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import LoginPage from './LoginPage'
import UpdateCoursePage from '../components/UpdateCourse'
import { useHistory } from 'react-router-dom'


const LoggedInUser=()=>{
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState();
    const history = useHistory()
    
    
    const token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')
    const requestOptions ={
        method: 'GET',
        headers: {
            'content-type':'application/json',
            'Authorization': `Bearer ${JSON.parse(token)}`
        }
    }

    useEffect(
        ()=>{
            fetch('/course/courses-owner', requestOptions)
            .then(res=>res.json())
            .then(data=>{
                setCourses(data)
            })
            .catch(err=>console.log(err))
        },[]
    );

    useEffect(
        ()=>{
            fetch('/auth/actual-user', requestOptions)
            .then(res=>res.json())
            .then(data=>{
                setUser(data)
            })
            .catch(err=>console.log(err))
        },[]
    );

    return(
        <div className='container'>
        <h1> {user?.username}, you uploaded these courses:</h1>
        {
            courses.map(
                (course, index)=>(
                    <Course key={index} name={course.name} description={course.description} update={true}
                    onClick={()=>{history.push(`/update-course/${course.id}`)}}
                    />
                )
            )
        }
        </div>
    )
    
}

const UserPage = () => {
    const [logged]=useAuth();
    return(
        <>
            {logged?<LoggedInUser/>:<LoginPage/>}
        </>
    )
}

export default UserPage;