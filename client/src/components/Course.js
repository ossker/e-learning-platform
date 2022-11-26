import React from "react";
import { Card, Modal, Button } from 'react-bootstrap'

const Course = ({name, description, owner, onClick})=>{
    return (
        <Card className="course">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <p>{description}</p>
                <p>{owner}</p>
                <Button variant='primary' onClick={onClick}>Update</Button>
            </Card.Body>
            
        </Card>
    )
}

export default Course;