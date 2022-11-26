import React from "react";
import { Card, Modal, Button } from 'react-bootstrap'

const Course = ({name, description, owner, onClick, update})=>{
    return (
        <Card className="course">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <p>{description}</p>
                <p>{owner}</p>
                {update?<Button variant='primary' onClick={onClick}>Update</Button>:<p></p>}
                
            </Card.Body>
            
        </Card>
    )
}

export default Course;