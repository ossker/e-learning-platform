import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import React from 'react'

import NavBar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AddCoursePage from './pages/AddCoursePage';
import SingleCoursePage from './pages/SingleCoursePage';
import MyProfilePage from './pages/MyProfilePage';
import UserPage from './pages/UserPage';
import EnrolledCoursePage from './pages/EnrolledCoursePage';
import CoursesPage from './pages/CoursesPage';
import Footer from './components/Footer';
import EditCoursePage from './pages/EditCoursePage';

const App = () => {
    return (
        <Router>
            <div style={{"minHeight":"61.1vh"}}>
                <NavBar/>
                <Switch>
                    <Route path="/add-course">
                        <AddCoursePage/>
                    </Route>
                    <Route path="/login">
                        <LoginPage/>
                    </Route>
                    <Route path="/signup">
                        <SignUpPage/>
                    </Route>
                    <Route path="/my-profile">
                        <MyProfilePage/>
                    </Route>
                    <Route path="/courses/:id">
                        <SingleCoursePage/>
                    </Route>
                    <Route path="/edit-course/:id">
                        <EditCoursePage/>
                    </Route>
                    <Route path="/enrolled/:course_id/:user_id">
                        <EnrolledCoursePage/>
                    </Route>
                    <Route path = "/category/:category">
                        <CoursesPage/>
                    </Route>
                    <Route path="/users/:id">
                        <UserPage/>
                    </Route>
                    <Route path="/">
                        <HomePage/>
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </Router>
    )
}


export default App;
