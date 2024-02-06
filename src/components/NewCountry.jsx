import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { PlusCircleFill } from 'react-bootstrap-icons';

class NewCountry extends Component {
  state = { 
    showModal: false,
    newCountryName: "",
    showToast: false,
    setToast: false,
   }

   handleModalClose = () => this.setState( {  showModal: false });

   handleModalKeyPress = (e) => (e.keyCode ? e.keyCode : e.which) === 13 && this.handleAdd();

   handleAdd = () => {
    if(this.state.newCountryName.length <= 0) {
      this.setState({ showToast: true});
    };
    this.state.newCountryName.length > 0 && this.props.onAdd(this.state.newCountryName);
    this.handleModalClose();
   }
  
  render() { 
    return (
      <React.Fragment>
        <Button 
          variant="outline-success" 
          onClick={ () => this.setState({ showModal: true, newCountryName: "" })}>
          <PlusCircleFill />
        </Button>
        <Modal 
          onKeyPress={ this.handleModalKeyPress }
          show={ this.state.showModal }
          onHide={ this.handleModalClose }
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
                onChange={ (e) => this.setState( { [e.target.name]: e.target.value})}
                value={ this.state.newCountryName }
                placeholder="enter name"
                autoFocus
                autoComplete='off'
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary"
              onClick={ this.handleModalClose }
            >Close
            </Button>
            <Button 
              variant="primary"
              onClick={ this.handleAdd }>
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
        onClose={()=>this.setState({ showToast: false }) }
        autohide
        bg='danger'
        show={this.state.showToast}
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
}

export default NewCountry;
