import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Oponer.css'


class Oponer extends Component {
  state = {
    request: {},
    lgShow: false,
  } 

  getAcceso = async (request_id) => {
    const response = await fetch(`/api/request/${request_id}`);
    const data = await response.json();
    const request_json = data[0];
    this.setState({ request: request_json });
  }

  handleModalOpen = () => {
    this.setState({ lgShow: true });
    this.getAcceso(this.props.request_id);
  }

  handleModalClose = () => {
    this.setState({ lgShow: false });
  }

  submitReject = async (event) => {
    event.preventDefault();
    var request_id = this.state.request.request_id;
    var req_status = 'Rejected';
    var admin = window.localStorage.getItem('admin_id');
    var body = {
      request_status: req_status,
      admin_id: admin,
    }
    const response = await fetch(`/api/requests/${request_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    this.setState({ lgShow: false });
    window.location.reload();
  }

  submitOppose = async (event) => {
    event.preventDefault();
    var request_id = this.state.request.request_id;
    var req_status = 'Complete';
    var admin = window.localStorage.getItem('admin_id');
    var oppose = 1;
    var client_id = this.state.request.client_id;
    var body = {
      request_status: req_status,
      admin_id: admin,
      oppose: oppose,
    }
    const response = await fetch(`/api/requests/${request_id}?client=${client_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    this.setState({ lgShow: false });
    window.location.reload();
  }

render() { 
  const { request_id } = this.props;
  return (
      <>
      <Button onClick={this.handleModalOpen}>Details</Button>
      <Modal 
          size="lg"
          show={this.state.lgShow}
          aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header closeButton onClick={this.handleModalClose}>
            <Modal.Title className='derecho'>
              Oppose
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
                <Form>
                  <Form.Label>Are you sure that you want to OPPOSE this clients information?</Form.Label>
                  <Col sm={4} md={4} hidden>
                    <Form.Label>Request Id</Form.Label>
                    <Form.Control
                      type='number'
                      value={this.state.request.request_id || ''}
                      autoFocus
                      readOnly
                    />
                  </Col>
                  <Col sm={4} md={4}>
                    <Form.Label>Client Id</Form.Label>
                    <Form.Control
                      type='text'
                      value={this.state.request.client_id || ''}
                      autoFocus
                      readOnly
                    />
                  </Col>
                </Form>
              </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleModalClose}>
              Close
            </Button>
            <Button variant="primary"
              onClick={this.submitReject}>
              Reject Request
            </Button>
            <Button variant="success"
              onClick={this.submitOppose}>
              Oppose
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default Oponer;
