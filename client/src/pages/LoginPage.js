
import { NavLink, useHistory } from "react-router-dom";
import styled from 'styled-components';
import React, { useState } from 'react'
import { useForm }  from 'react-hook-form'
import {  MdReportGmailerrorred, MdCancel } from 'react-icons/md';
import { login, useAuth } from '../auth'
import HomePage from "./HomePage";

const NotLoggedInUser = () => {
    const {register, watch, handleSubmit, reset, formState:{errors}} = useForm();
    const history = useHistory();
    const [showError, setShowError] = useState();

    const loginUser = (data) => {
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
            if(data.access_token){
                login(data.access_token)
                reset()
                history.push('/')
            }
            else{
                setShowError(true);
            }
        })
    }

    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "rgb(124, 31, 255)" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 pt-5">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-5">Log In</p>
                                            
                                            <InputWrapper>
                                            {showError?<div className="error-response"><MdCancel/> <p className="error">INVALID USERNAME OR PASSWORD.</p></div>:""}
                                                <form className="mx-1 mx-md-4">
                                                    <div className="flex-row align-items-center mb-5">
                                                            <div className="form__group field">
                                                                <input type="text" className="form__field" placeholder="Username" name="username" id='username' required 
                                                                {...register("username", {required:true, maxLength:25})}
                                                                />
                                                                {errors.username && errors.username?.type ==="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Username is required.</p></div>}

                                                                <label htmlFor="username" className="form__label">Username</label>
                                                            </div>
                                                    </div>


                                                    <div className="flex-row align-items-center mb-5">
                                                            <div className="form__group field">
                                                                <input type="password" className="form__field" placeholder="password" name="password" id='password' required autoComplete="off"
                                                                {...register("password", {required: true, minLength:7})}
                                                                />
                                                                {errors.password && errors.password?.type ==="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Password is required.</p></div>}
                                                                <label htmlFor="password" className="form__label">Password</label>
                                                            </div>
                                                    </div>

                                                    
                                                    <div className="d-flex justify-content-center mx-4 mb-4 mb-lg-4">
                                                        <ButtonWrapper>
                                                            <button type="submit" className="item-btn see-details-btn" onClick={handleSubmit(loginUser)}>Log In</button>
                                                        </ButtonWrapper>
                                                    </div>

                                                    <div className="text-center text-lg-start mt-4 pt-2">
                                                        <p className="small text-center fw-bold mt-2 pt-1 mb-0">Do not have an account?
                                                            <NavLink to="/signup"style={{color: 'rgb(99, 47, 245)'}}> Sign up</NavLink>
                                                        </p>
                                                    </div>
                                                    
                                                </form>
                                            </InputWrapper>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://img.freepik.com/darmowe-wektory/zaloguj-sie-ilustracja-koncepcja-abstrakcyjna-strony_335657-3875.jpg?w=826&t=st=1670463123~exp=1670463723~hmac=e50e04a7e7c0ae27aad9ccbe0c70e306e204adebfa56d9571b0923be44cf4a14"
                                                className="img-fluid" alt="Registration Image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const Login = () => {
    const [logged]=useAuth();

    return(
        <>
        {!logged?<NotLoggedInUser/>:<HomePage/>}
        </>
    )
}

const InputWrapper = styled.div`
.error-response{
    display: flex;
    color: red;
    font-weight: bold;
    font-size: 2rem;
    margin-left: 2rem;
}
.error-section{
    margin-top: 0.5rem;
    display: flex;
    color: red;
    height: 0.5rem;
    font-weight: bold;
}
.error{
    margin-left: 5px;
    font-size: 1.1rem;
}
.form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 5px;
    margin-left: 10px;
    width: 100%;
  }
  
  .form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9673f5;
    outline: 0;
    font-size: 1.3rem;
    color: black;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
  
    &::placeholder {
      color: transparent;
    }
  
    &:placeholder-shown ~ .form__label {
      font-size: 1.3rem;
      cursor: text;
      top: 20px;
    }
  }
  
  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #9b9b9b;
  }
  
  .form__field:focus {
    ~ .form__label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #632ff5;
      font-weight:700;    
    }
    padding-bottom: 6px;  
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #31177a,#632ff5,#c9b6fc);
    border-image-slice: 1;
  }

  .form__field{
    &:required,&:invalid { box-shadow:none; }
  }
`


const ButtonWrapper = styled.div`
.item-btn{
    font-size: 15px;
    display: inline-block;
    padding: 6px 16px;
    font-weight: 700;
    transition: var(--transition);
    white-space: nowrap;

    &.see-details-btn{
      background-color: transparent;
      border: 1px solid var(--clr-black);
      margin-right: 5px;

      &:hover{
        background-color: rgba(0, 0, 0, 0.9);
        color: var(--clr-white);
      }
    }
}
`

export default Login