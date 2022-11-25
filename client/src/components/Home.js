import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../auth'

const LoggedInHome=()=>{
    return(
        <div className='courses'>
            <h1>List of courses.</h1>
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