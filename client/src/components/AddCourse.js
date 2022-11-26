import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const AddCoursePage = () => {

    const { register, handleSubmit, reset, formState:{errors} } = useForm()

    const createCourse = (data) =>{
        const token=localStorage.getItem('REACT_TOKEN_AUTH_KEY')
        const requestOptions ={
            method: 'POST',
            headers: {
                'content-type':'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }

        fetch('/course/courses', requestOptions)
        .then(res=>res.json())
        .then(data=>{
            reset()
        })
        .catch(err=>console.log(err))
        
    }

    return(
        <div className='container'>
            <h1>Add Course Page</h1>
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
                    <Button variant="primary" onClick={handleSubmit(createCourse)}>
                        Save
                    </Button>
                </Form.Group>
            </form>
        </div>
    )
}

export default AddCoursePage;