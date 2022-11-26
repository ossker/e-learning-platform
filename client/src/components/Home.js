import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../auth'
import Course from './Course'
import { Modal, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const LoggedInHome=()=>{
    const [courses, setCourses] = useState([]);
    const [show, setShow] = useState(false);
    const {register, reset, handleSubmit,setValue, formState:{errors}} = useForm();
    const [courseId, setCourseId] = useState(0);

    useEffect(
        ()=>{
            fetch('/course/courses')
            .then(res=>res.json())
            .then(data=>{
                setCourses(data)
            })
            .catch(err=>console.log(err))
        },[]
    );

    

    const closeModal=()=>{
        setShow(false)
    }

    const showModal=(id)=>{
        console.log("Hello "+ id);
        setShow(true)
        setCourseId(id)
        courses.map(
            (item)=>{
                if(item.id==id){
                    setValue('name', item.name)
                    setValue('description', item.description)
                }
            }
        )
    }

    const updateCourse=(data)=>{
        let token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')
        const requestOptions ={
            method: 'PUT',
            headers: {
                'content-type':'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }

        fetch(`/course/course/${courseId}`, requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log(courseId)
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }

    return(
        <div className='courses container'>
            <Modal
                show={show}
                size="lg"
                onHide={closeModal}
            >   
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Course
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    <Button variant="primary" onClick={handleSubmit(updateCourse)}>
                        Save
                    </Button>
                </Form.Group>
            </form>
                </Modal.Body>
            </Modal>
            <h1>List of courses.</h1>
            {
                courses.map(
                    (course, index)=>(
                        <Course key={index} name={course.name} description={course.description} owner={course.owner}
                        onClick={()=>{showModal(course.id)}} update={false}
                        />
                    )
                )
            }
        </div>
    )
}

const LoggedOutHome=()=>{
    return(
        <div className='home container'>
            <h1>Home Page</h1>
            <Link to="/signup" className='btn btn-primary btn-lg'>Get Started</Link>
        </div>
    )
}

const HomePage = () => {
    const [logged]=useAuth();

    return(
        <>
            {logged?<LoggedInHome/>:<LoggedOutHome/>}
        </>
    )
}

export default HomePage;