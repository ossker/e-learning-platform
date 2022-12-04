import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css'
import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './components/Home';
import SignUpPage from './components/SignUp';
import LoginPage from './components/Login';
import AddCoursePage from './components/AddCourse';
import UserPage from './components/User';
import UpdateCoursePage from './components/UpdateCourse';

const App = () => {

    return (
        <Router>
            <div className=''>
                <NavBar/>
                <Switch>
                    <Route path="/add_course">
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
                    <Route path="/">
                        <HomePage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}



ReactDOM.render(<App/>, document.getElementById('root'));