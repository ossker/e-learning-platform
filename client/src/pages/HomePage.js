import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../auth'
import Course from '../components/Course'
import { Modal, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Hero from '../components/Hero'
import CourseList from '../components/CourseList'
import CategoriesList from '../components/CategoriesList'

const LoggedInHome=()=>{
    
    const [show, setShow] = useState(false);
    const {register, reset, handleSubmit,setValue, formState:{errors}} = useForm();
    const [courseId, setCourseId] = useState(0);

    


    return(
        <div className='courses container'>
            
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
        <div className='holder'>
            <Hero/>
            <CourseList/>
            <CategoriesList/>
        </div>
    )
}

export default HomePage;