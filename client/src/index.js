import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './components/Home';

const App = () => {


    return (
        <Router>
            <div className='container'>
                <NavBar/>
                <Switch>
                    <Route path="/">
                        <HomePage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}



ReactDOM.render(<App/>, document.getElementById('root'));