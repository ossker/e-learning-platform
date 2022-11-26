import React from "react";
import { Card } from 'react-bootstrap'

const Course = ({name, description, owner})=>{
    return (
        <Card className="course">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <p>{description}</p>
                <p>{owner}</p>
            </Card.Body>
            
        </Card>
    )
}

export default Course;