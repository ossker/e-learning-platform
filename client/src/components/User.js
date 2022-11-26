import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../auth'
import Course from './Course'
import { Modal, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import LoginPage from './Login'

const LoggedInUser=()=>{
    const [courses, setCourses] = useState([]);

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
                console.log(data)
                setCourses(data)
            })
            .catch(err=>console.log(err))
        },[]
    );

    return(
        <div>
        <h1>You uploaded these courses:</h1>
        {
            courses.map(
                (course, index)=>(
                    <Course key={index} name={course.name} description={course.description} update={true}
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