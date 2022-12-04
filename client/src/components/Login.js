import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login, useAuth } from '../auth'
import { useHistory } from 'react-router-dom'

const LoginPage = () => {

    const {register, watch, handleSubmit, reset, formState:{errors}} = useForm();
    

    
    const [logged]=useAuth();
    
    return(
        <div className='container'>
            <div className='form'>
                <h1>Login Page</h1>
                {logged?<div>You are logged in.</div>:<LoginForm/>}
            </div>
        </div>
    )
}

const LoginForm = () =>{
    const {register, watch, handleSubmit, reset, formState:{errors}} = useForm();
    const history = useHistory();
    const loginUser = (data) => {
        console.log(data)

        const requestOptions={
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        }

        fetch('/auth/login', requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.access_token)
            login(data.access_token)
            history.push('/')
        })
        

        reset()
    }
    return(
        <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Your username"
                        {...register("username", {required:true, maxLength:25})}
                        />
                        {errors.username && <p style={{color: "red"}}><small>Username is required.</small></p>}
                        {errors.username?.type==="maxLength" && <p style={{color: "red"}}><small>Max characters should be 25.</small></p>}
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" 
                        placeholder="Your password"
                        {...register("password", {required: true, minLength:7})}
                        />
                        {errors.password && <p style={{color: "red"}}><small>Password is required.</small></p>}
                        {errors.password?.type==="minLength" && <p style={{color: "red"}}><small>Min characters should be 7.</small></p>}
                    </Form.Group>

                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(loginUser)}>Login</Button>
                    </Form.Group>
                    <Form.Group>
                        <small>Do not have an account? <Link to="/signup">Create one.</Link></small>
                    </Form.Group>
                </form>
    )
}

export default LoginPage;