import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm }  from 'react-hook-form'

const SignUpPage = () => {
    
    const {register, watch, handleSubmit, reset, formState:{errors}} = useForm();

    const submitForm = (data) => {
        if(data.password === data.confirm_password){

            const body = {
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
                confirm_password: data.confirm_password
            }

            const requestOptions = {
                method:"POST",
                headers: {
                    'content-type': 'application/json'
                }, 
                body: JSON.stringify(body)
    
            }
    
            fetch('/auth/signup', requestOptions)
            .then(res=>res.json())
            .then(data=>console.log(data))
            .catch(err=>console.log(err))
    
            reset();
        }
        else {
            alert("Passwords do not match.")
        }
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
                        {errors.username && <p style={{color: "red"}}><small>Username is required.</small></p>}
                        {errors.username?.type==="maxLength" && <p style={{color: "red"}}><small>Max characters should be 25.</small></p>}
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Your first name"
                        {...register("first_name", {required: true, maxLength:25})}
                        />
                        {errors.first_name && <p style={{color: "red"}}><small>First name is required.</small></p>}
                        {errors.first_name?.type==="maxLength" && <p style={{color: "red"}}><small>Max characters should be 25.</small></p>}
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Your last name"
                        {...register("last_name", {required: true, maxLength:25})}
                        />
                        {errors.last_name && <p style={{color: "red"}}><small>Last name is required.</small></p>}
                        {errors.last_name?.type==="maxLength" && <p style={{color: "red"}}><small>Max characters should be 25.</small></p>}
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" 
                        placeholder="Your email"
                        {...register("email", {required: true, maxLength:80})}
                        />
                        {errors.email && <p style={{color: "red"}}><small>Email is required.</small></p>}
                        {errors.email?.type==="maxLength" && <p style={{color: "red"}}><small>Max characters should be 80.</small></p>}
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
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" 
                        placeholder="Your password"
                        {...register("confirm_password", {required: true, minLength:7})}
                        />
                        {errors.confirm_password && <p style={{color: "red"}}><small>Confirm password is required.</small></p>}
                        {errors.confirm_password?.type==="minLength" && <p style={{color: "red"}}><small>Min characters should be 7.</small></p>}
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