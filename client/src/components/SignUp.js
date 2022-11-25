import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const submitForm = () => {
        console.log("Form submitted.");
        console.log(username);
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);

        setUsername("")
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    return(
        <div className='container'>
            <div className='form'>
                <h1>Sign Up Page</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Your username"
                        value={username}
                        name="username"
                        onChange={(e)=>{setUsername(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Your first name"
                        value={firstName}
                        name="firstName"
                        onChange={(e)=>{setFirstName(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Your last name"
                        value={lastName}
                        name="lastName"
                        onChange={(e)=>{setLastName(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" 
                        placeholder="Your email"
                        value={email}
                        name="email"
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" 
                        placeholder="Your password"
                        value={password}
                        name="password"
                        onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" 
                        placeholder="Your password"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={submitForm}>Sign Up</Button>
                    </Form.Group>
                    <Form.Group>
                        <small>Already have an account? <Link to="/login">Log In.</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage;