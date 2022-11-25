import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm }  from 'react-hook-form'

const SignUpPage = () => {
    
    const {register, watch, handleSubmit, formState:{errors}} = useForm();

    const submitForm = (data) => {
       console.log(data);
    }


    console.log(watch("username"));

    return(
        <div className='container'>
            <div className='form'>
                <h1>Sign Up Page</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Your username"
                        {...register("username", {required: true, maxLength:25})}
                        />
                        {errors.username && <span style={{color: "red"}}>Username is required.</span>}
                        {errors.username?.type=="maxLength" && <span style={{color: "red"}}>Max characters should be 25.</span>}
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Your first name"
                        {...register("first_name", {required: true, maxLength:25})}
                        />
                        {errors.first_name && <span style={{color: "red"}}>First name is required.</span>}
                        {errors.first_name?.type=="maxLength" && <span style={{color: "red"}}>Max characters should be 25.</span>}
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Your last name"
                        {...register("last_name", {required: true, maxLength:25})}
                        />
                        {errors.last_name && <span style={{color: "red"}}>Last name is required.</span>}
                        {errors.last_name?.type=="maxLength" && <span style={{color: "red"}}> Max characters should be 25.</span>}
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" 
                        placeholder="Your email"
                        {...register("email", {required: true, maxLength:80})}
                        />
                        {errors.email && <span style={{color: "red"}}>Email is required.</span>}
                        {errors.email?.type=="maxLength" && <span style={{color: "red"}}> Max characters should be 80.</span>}
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" 
                        placeholder="Your password"
                        {...register("password", {required: true, minLength:7})}
                        />
                        {errors.password && <span style={{color: "red"}}>Password is required.</span>}
                        {errors.password?.type=="minLength" && <span style={{color: "red"}}> Min characters should be 7.</span>}
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" 
                        placeholder="Your password"
                        {...register("confirm_password", {required: true, minLength:7})}
                        />
                        {errors.confirm_password && <span style={{color: "red"}}>Confirm password is required.</span>}
                        {errors.confirm_password?.type=="minLength" && <span style={{color: "red"}}> Min characters should be 7.</span>}
                    </Form.Group>
                    
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(submitForm)}>Sign Up</Button>
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