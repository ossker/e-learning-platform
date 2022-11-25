import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth, logout } from '../auth'


const LoggedInLinks=()=>{
    return(
        <>
            <li className="nav-item">
                <Link className="nav-link active" to="/add_course">Add Course</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link active" href="#" onClick={()=>{logout()}}>Log Out</a>
            </li>
        </>
    )
}

const LoggedOutLinks=()=>{
    return(
        <>
            <li className="nav-item">
                <Link className="nav-link active" to="/signup">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/login">Log In</Link>
            </li>
        </>
    )
}

const NavBar = () => {

    const [logged] = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">E-learning Platform</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        {logged?<LoggedInLinks/>:<LoggedOutLinks/>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar