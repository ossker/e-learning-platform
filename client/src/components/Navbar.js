import React from 'react'

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">E-learning Platform</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" href="#">Courses</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" href="#">Sign Up</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" href="#">Log In</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar