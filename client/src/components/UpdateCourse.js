import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../auth'
import Course from './Course'
import { Modal, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import LoginPage from '../pages/LoginPage'
import Tutorial from './Tutorial'

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
                    <Button variant="primary">
                        Save
                    </Button>
                </Form.Group>
            </form>
            <Tutorials courseId={id.id}/>
        </div>
    )
    
}

const UpdateCoursePage = () => {
    const [logged]=useAuth();
    let {id} = useParams();
    return(
        <>
            {logged?<LoggedInUpdateCourse id={id}/>:<LoginPage/>}
        </>
    )
}


const Tutorials = (courseId) => {
    const [tutorials, setTutorials] = useState();
    
    useEffect(
        ()=>{
            fetch(`/tutorial/tutorials-course/${courseId.courseId}`)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                setTutorials(data)
            })
            .catch(err=>console.log(err))
        },[]
        
    );
    return (
        <div>
            <h3>TUTORIALS HERE</h3>
        {
            tutorials?.map((tutorial, index)=>(
                    <Tutorial key={index} title={tutorial.title} content={tutorial.content}/>
                )
            )
        }
        </div>
    )
}

export default UpdateCoursePage;