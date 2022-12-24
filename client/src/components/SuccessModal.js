import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

const SuccessModal = (content) => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    return (
        <>
                <Modal
                    show={show}
                    onHide={handleClose}
                >
                    <ModalWrapper>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h3 className='success'>
                                    Success!
                                </h3>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h3 className='content'>
                                {content.content}
                            </h3>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-dark" className='button' onClick={handleClose}>
                                Great
                            </Button>
                        </Modal.Footer>
                    </ModalWrapper>
                </Modal>
        </>
    );
}

const ModalWrapper = styled.div`
.success{
    color: #02a82f;
    font-weight: bold;
}
.content{
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
    background-color: #02a82f;
    transition: 0.5s;
    :hover{
        background-color: #04c739;
    }
}


`

export default SuccessModal;