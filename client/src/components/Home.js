import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../auth'
import Course from './Course'

const LoggedInHome=()=>{
    const [courses, setCourses] = useState([]);

    useEffect(
        ()=>{
            fetch('/course/courses')
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                setCourses(data)
            })
            .catch(err=>console.log(err))
        },[]
    );

    return(
        <div className='courses'>
            <h1>List of courses.</h1>
            {
                courses.map(
                    (course)=>(
                        <Course name={course.name} description={course.description} owner={course.owner}/>
                    )
                )
            }
        </div>
    )
}

const LoggedOutHome=()=>{
    return(
        <div className='home container'>
            <h1>Home Page</h1>
            <Link to="/signup" className='btn btn-primary btn-lg'>Get Started</Link>
        </div>
    )
}

const HomePage = () => {
    const [logged]=useAuth();

    return(
        <>
            {logged?<LoggedInHome/>:<LoggedOutHome/>}
        </>
    )
}

export default HomePage;