import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AddCoursePage from './components/AddCourse';
import UserPage from './pages/UserPage';
import UpdateCoursePage from './components/UpdateCourse';
import SingleCoursePage from './pages/SingleCoursePage';

const App = () => {

    return (
        <Router>
            <div className=''>
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
                    <Route path="/user">
                        <UserPage/>
                    </Route>
                    <Route path="/update-course/:id">
                        <UpdateCoursePage/>
                    </Route>
                    <Route path="/courses/:id">
                        <SingleCoursePage/>
                    </Route>
                    <Route path="/">
                        <HomePage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}



ReactDOM.render(<App/>, document.getElementById('root'));