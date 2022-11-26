import React from "react";
import { Card, Modal, Button } from 'react-bootstrap'

const Tutorial = ({title, content})=>{
    return (
        <Card className="tutorial" bg="primary">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <p>{content}</p>
            </Card.Body>
            
        </Card>
    )
}

export default Tutorial;