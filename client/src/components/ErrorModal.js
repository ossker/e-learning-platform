import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

const ErrorModal = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
  return (
    <>
        
            <Modal
                show={show}
                onHide={handleClose}
                centered 
            >
                <ModalWrapper>
                <Modal.Header closeButton>
                <Modal.Title><h3 className='ops'>Ooops..</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className='token'>Something went wrong. Try again later.</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" className='button' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
                </ModalWrapper>
            </Modal>
    </>
  );
}

const ModalWrapper = styled.div`
.ops{
    color: #ba1e74;
    font-weight: bold;
}
.token{
    margin-top: 10px;
    margin-bottom: 10px;
}
.button{
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    border: 0px;
    color: white;
    font-weight: bold;
    background-color: #ba1e74;
    transition: 0.5s;
    :hover{
        background-color: #d42c89;
    }
}


`

export default ErrorModal;