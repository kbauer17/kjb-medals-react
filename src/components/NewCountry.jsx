import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { PlusCircleFill } from 'react-bootstrap-icons';

const NewCountry = (props) => {
  const [newCountryName, setNewCountryName] = useState("");
  const [ showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => {
    setShowModal(true);
    setNewCountryName("");
  }

  const handleModalKeyPress = (e) => (e.keyCode ? e.keyCode : e.which) === 13 && handleAdd();

  const handleAdd = () => {
    if (newCountryName.length <= 0) {
      setShowToast(true);
    };
    newCountryName.length > 0 && props.onAdd(newCountryName);
    handleModalClose();
   }
  
  return (
    <React.Fragment>
      <Button 
        variant="outline-success" 
        onClick={ handleModalShow }>
        <PlusCircleFill />
      </Button>
      <Modal 
        onKeyPress={ handleModalKeyPress }
        show={ showModal }
        onHide={ handleModalClose }
      >
        <Modal.Header closeButton>
          <Modal.Title>New Country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="modalForm1">
            <Form.Label>Country Name</Form.Label>
            <Form.Control
              type="text"
              name='newCountryName'
              onChange={ (e) => setNewCountryName(e.target.value) }
              value={ newCountryName }
              placeholder="enter name"
              autoFocus
              autoComplete='off'
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary"
            onClick={ handleModalClose }
          >Close
          </Button>
          <Button 
            variant="primary"
            onClick={ handleAdd }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        className="p-3"
        position='top-center'
        style={{ zIndex: 1 }}
      >
      
      <Toast
        onClose={ () => setShowToast(false) }
        autohide
        bg='danger'
        show={ showToast } 
        delay={2200}
      >
        <Toast.Header>
          <strong className='mr-auto'>Country Name Required</strong>
        </Toast.Header>
        <Toast.Body className={'dark' && 'text-white'}>
          Enter a name to add a country
        </Toast.Body>
      </Toast>
      </ToastContainer>
    </React.Fragment>
  );
}

export default NewCountry;
