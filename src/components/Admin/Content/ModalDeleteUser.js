import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDeleteUser = (props) => {
  const {show, setShow, dataDelete} = props;

  const handleClose = () => setShow(false);
  
  const handleDeleteUser = () => {
    alert('me')
  } 
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete the user?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user. Email: 
            <b>
                {dataDelete && dataDelete.email ? dataDelete.email : ""}
            </b>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;