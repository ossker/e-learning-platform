import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../auth'
import Course from './Course'
import { Modal, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import LoginPage from './Login'

const LoggedInUpdateCourse=(id)=>{
    const [course, setCourse] = useState();
    const {register, reset, handleSubmit,setValue, formState:{errors}} = useForm();
    useEffect(
        ()=>{
            fetch(`/course/course/${id.id}`)
            .then(res=>res.json())
            .then(data=>{
                setCourse(data)
                setValue('name', data.name)
                setValue('description', data.description)
            })
            .catch(err=>console.log(err))
        },[]
        
    );
    
    return(
        <div className='container'>
            <h1>UPDATE COURSE</h1>
            <form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"
                    {...register('name', {required:true, maxLength:100})}
                    />
                    {errors.name && <p style={{color: "red"}}><small>Name is required.</small></p>}
                    {errors.name?.type==="maxLength" && <p style={{color: "red"}}><small>Max characters should be 100.</small></p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5}
                    {...register('description')}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tutorial</Form.Label>
                    <Form.Control as="textarea" rows={5}
                    />
                </Form.Group>

                <Form.Group>
                    <Button variant="primary">
                        Save
                    </Button>
                </Form.Group>
            </form>
        </div>
    )
    
}

const UpdateCoursePage = () => {
    const [logged]=useAuth();
    let {id} = useParams();
    console.log(id)
    return(
        <>
            {logged?<LoggedInUpdateCourse id={id}/>:<LoginPage/>}
        </>
    )
}

export default UpdateCoursePage;