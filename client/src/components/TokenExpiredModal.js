import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

const TokenExpiredModal = () => {

  return (
    <>
            <Modal
                show={true}
                backdrop="static"
                keyboard={false}
                centered 
            >
                <ModalWrapper>
                <Modal.Header>
                <Modal.Title><h3 className='ops'>Ooops..</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className='token'>Your session has expired. Try to log in again.</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button href="/login" variant="outline-dark" className='button'>
                        Log In
                    </Button>
                </Modal.Footer>
                </ModalWrapper>
            </Modal>
    </>
  );
}

const ModalWrapper = styled.div`
.ops{
    color: #851f99;
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
    background-color: #851f99;
    transition: 0.5s;
    :hover{
        background-color: #b032c9;
    }
}


`

export default TokenExpiredModal;