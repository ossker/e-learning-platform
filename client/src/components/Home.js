import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
    return(
        <div className='home container'>
            <h1>Home Page</h1>
            <Link to="/signup" className='btn btn-primary btn-lg'>Get Started</Link>
        </div>
    )
}

export default HomePage;