
import { NavLink, useHistory } from "react-router-dom";
import styled from 'styled-components';
import React, { useState } from 'react'
import { useForm }  from 'react-hook-form'
import {  MdReportGmailerrorred, MdCancel } from 'react-icons/md';
import { useAuth } from '../auth';
import HomePage from './HomePage'
import ErrorModal from "../components/ErrorModal";

const LoggedInUser = () => {
    const {register, watch, handleSubmit, reset, formState:{errors}} = useForm();
    const [showError, setShowError] = useState();
    const [showModalError, setShowModalError] = useState(false);
    const history = useHistory();

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
            .then(data=>{
                if(data.status == 1)
                {
                    reset();
                    history.push('/login')
                }
                else if(data.status == 0){
                    setShowError(true);
                }
                else{
                    setShowModalError(true)
                }
            })
            .catch(err=>console.log(err))
                
        }
        else {
            alert("Passwords do not match.")
        }
    }

    return (
<>
{showModalError?<ErrorModal/>:null}
            <section className="vh-100" style={{ backgroundColor: "rgb(179, 20, 91)" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                            
                                            <InputWrapper>
                                            {showError?<div className="error-response"><MdCancel/> <p className="error">USERNAME OR EMAIL TAKEN.</p></div>:""}
                                                <form className="mx-1 mx-md-4">
                                                    <div className="flex-row align-items-center mb-3">
                                                            <div className="form__group field">
                                                                <input type="text" className="form__field" placeholder="Username" name="username" id='username' required 
                                                                {...register("username", {required: true, maxLength:25})}
                                                                />
                                                                {errors.username && errors.username?.type ==="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Username is required.</p></div>}
                                                                {errors.username && errors.username?.type !=="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Too much characters.</p></div>}

                                                                <label htmlFor="username" className="form__label">Username</label>
                                                            </div>
                                                    </div>

                                                    <div className="flex-row align-items-center mb-3">
                                                            <div className="form__group field">
                                                                <input type="text" className="form__field" placeholder="First name" name="firstName" id='firstName' required 
                                                                {...register("first_name", {required: true, maxLength:25})}
                                                                />
                                                                {errors.first_name && errors.first_name?.type ==="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">First name is required.</p></div>}
                                                                {errors.first_name && errors.first_name?.type !=="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Too much characters.</p></div>}

                                                                <label htmlFor="firstName" className="form__label">First name</label>
                                                            </div>
                                                    </div>

                                                    <div className="flex-row align-items-center mb-3">
                                                            <div className="form__group field">
                                                                <input type="text" className="form__field" placeholder="Last name" name="lastName" id='lastName' required 
                                                                {...register("last_name", {required: true, maxLength:25})}
                                                                />
                                                                {errors.last_name && errors.last_name?.type ==="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Last name is required.</p></div>}
                                                                {errors.last_name && errors.last_name?.type !=="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Too much characters.</p></div>}

                                                                <label htmlFor="lastName" className="form__label">Last name</label>
                                                            </div>
                                                    </div>

                                                    <div className="flex-row align-items-center mb-3">
                                                            <div className="form__group field">
                                                                <input type="email" className="form__field" placeholder="Email" name="email" id='email' required 
                                                                {...register("email", {required: true, maxLength:80, pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/})}
                                                                />
                                                                {errors.email && errors.email?.type ==="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Email is required.</p></div>}
                                                                {errors.email && errors.email?.type !=="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Invalid email.</p></div>}
                                                                <label htmlFor="email" className="form__label">Email</label>
                                                            </div>
                                                    </div>

                                                    <div className="flex-row align-items-center mb-3">
                                                            <div className="form__group field">
                                                                <input type="password" className="form__field" placeholder="Password" name="password" id='password' required autoComplete="off"
                                                                {...register("password", {required: true, minLength:7, pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/})}
                                                                />
                                                                {errors.password && errors.password?.type ==="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Password is required.</p></div>}
                                                                {errors.password && errors.password?.type !=="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Invalid password.</p></div>}
                                                                <label htmlFor="password" className="form__label">Password</label>
                                                            </div>
                                                    </div>

                                                    <div className="flex-row align-items-center mb-5">
                                                            <div className="form__group field">
                                                                <input type="password" className="form__field" placeholder="Confirm password" name="cpassword" id='cpassword' required autoComplete="off"
                                                                {...register("confirm_password", {required: true, minLength:7, pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/})}
                                                                />
                                                                {errors.confirm_password && errors.confirm_password?.type ==="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Password is required.</p></div>}
                                                                {errors.confirm_password && errors.confirm_password?.type !=="required" && <div className="error-section"><MdReportGmailerrorred/> <p className="error">Invalid password.</p></div>}

                                                                <label htmlFor="cpassword" className="form__label">Confirm password</label>
                                                            </div>
                                                    </div>

                                                    
                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <ButtonWrapper>
                                                            <button type="submit" className="item-btn see-details-btn" onClick={handleSubmit(submitForm)}>Sign Up</button>
                                                        </ButtonWrapper>
                                                    </div>

                                                    <div className="text-center text-lg-start mt-4 pt-2">
                                                        <p className="small text-center fw-bold mt-2 pt-1 mb-0">Already have an account?
                                                            <NavLink to="/login"style={{color: 'rgb(129, 0, 161)'}}> Log In</NavLink>
                                                        </p>
                                                    </div>
                                                    
                                                </form>
                                            </InputWrapper>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://img.freepik.com/darmowe-wektory/ilustracja-koncepcja-utrzymania_114360-391.jpg?w=1380&t=st=1670357153~exp=1670357753~hmac=ff7af0f00a5e377f04fd75b1637594bcb54f014a14042cbab9358054f2704fd3"
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

const Signup = () => {
    const [logged]=useAuth();
    return (
        <>
            {!logged?<LoggedInUser/>:<HomePage/>}
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
    border-bottom: 2px solid #cf46f2;
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
      color: #760094;
      font-weight:700;    
    }
    padding-bottom: 6px;  
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #760094,#cb42ed,#edb4fa);
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

export default Signup