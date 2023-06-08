import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Rectificar.css'
class Rectificar extends Component {
  state = {
    request: {},
    lgShow: false,
    field: '',
    changed: '',
  } 

  getRectify = async (request_id) => {
    const response = await fetch(`/api/request/${request_id}`);
    const data = await response.json();
    const request_json = data[0];
    this.setState({ request: request_json, field: (request_json.request_comment).split(":")[0], changed: (request_json.request_comment).split(":")[1] });
  }

  handleModalOpen = () => {
    this.setState({ lgShow: true });
    this.getRectify(this.props.request_id);
  }

  handleModalClose = () => {
    this.setState({ lgShow: false });
  }

  submitWaiting = async (event) => {
    event.preventDefault();
    var request_id = this.state.request.request_id;
    var req_status = 'Waiting';
    var admin = window.localStorage.getItem('admin_id');
    var body = {
      request_status: req_status,
      admin_id: admin,
    };
    const response = await fetch(`/api/requests/${request_id}?client=${this.state.request.client_id}`, {
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

  submitReject = async (event) => {
    event.preventDefault();
    var request_id = this.state.request.request_id;
    var req_status = 'Reject';
    var admin = window.localStorage.getItem('admin_id');
    var body = {
      request_status: req_status,
      admin_id: admin,
    };
    const response = await fetch(`/api/requests/${request_id}?client=${this.state.request.client_id}`, {
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

  submitRectify = async (event) => {
    event.preventDefault();
    var request_id = this.state.request.request_id;
    var req_status = 'Complete';
    var admin = window.localStorage.getItem('admin_id');
    var body = {
      request_status: req_status,
      admin_id: admin,
      fields: this.state.field,
      changed: this.state.changed,
    };
    const response = await fetch(`/api/requests/${request_id}?client=${this.state.request.client_id}`, {
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
            Rectify
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col sm={4} md={4} hidden>
                <Form.Label>Request Id</Form.Label>
                <Form.Control
                  type='number'
                  value={this.state.request.request_id || ''}
                  autoFocus
                  readOnly
                  id='request_id'
                />
              </Col>
              <Col sm={4} md={4}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.field === 'client_name' ? this.state.changed : this.state.request.client_name || ''}
                  autoFocus
                  readOnly
                  id='client_name'
                  className={this.state.field === 'client_name' ? 'red-text' : ''}
                />
              </Col>
              <Col sm={4} md={4}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={this.state.field === 'client_first_last_name' ? this.state.changed : this.state.request.client_first_last_name || ''}
                autoFocus
                readOnly
                id='client_first_last_name'
                className={this.state.field === 'client_first_last_name' ? 'red-text' : ''}
              />
              </Col>
              <Col sm={4} md={4}>
              <Form.Label>Second Last Name</Form.Label>
              <Form.Control
                type="text"
                value={this.state.field === 'client_second_last_name' ? this.state.changed : this.state.request.client_second_last_name || ''}
                autoFocus
                readOnly
                id='client_second_last_name'
                className={this.state.field === 'client_second_last_name' ? 'red-text' : ''}
              />
              </Col>
              <Col sm={4} md={4}>
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.field === 'client_born_date' ? this.state.changed : this.state.request.client_born_date || ''}
                  autoFocus
                  readOnly
                  id='client_born_date'
                  className={this.state.field === 'client_born_date' ? 'red-text' : ''}
                />
              </Col>
              <Col sm={4} md={4}>
                <Form.Label>Nationality</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.field === 'client_nationality' ? this.state.changed : this.state.request.client_nationality || ''}
                  autoFocus
                  readOnly
                  id='client_nationality'
                  className={this.state.field === 'client_nationality' ? 'red-text' : ''}
                />
              </Col>
              <Col sm={4} md={4}>
                <Form.Label>Birth State</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.field === 'client_birth_state' ? this.state.changed : this.state.request.client_birth_state || ''}
                  autoFocus
                  readOnly
                  id='client_birth_state'
                  className={this.state.field === 'client_birth_state' ? 'red-text' : ''}
                />
              </Col>
              <Col sm={4} md={4}>
                <Form.Label>CURP</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.field === 'client_curp' ? this.state.changed : this.state.request.client_curp || ''}
                  autoFocus
                  readOnly
                  id='client_curp'
                  className={this.state.field === 'client_curp' ? 'red-text' : ''}
                />
              </Col>
              <Col sm={4} md={4}>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  value={this.state.field === 'client_email' ? this.state.changed : this.state.request.client_email || ''}
                  autoFocus
                  readOnly
                  id='client_email'
                  className={this.state.field === 'client_email' ? 'red-text' : ''}
                />
              </Col>
              <Col sm={4} md={4}>
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.field === 'address_street' ? this.state.changed : this.state.request.address_street || ''}
                  autoFocus
                  readOnly
                  id='address_street'
                  className={this.state.field === 'address_street' ? 'red-text' : ''}
                />
              </Col>
              <Col sm={4} md={4}>
                <Form.Label>Address City</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.field === 'address_city' ? this.state.changed : this.state.request.address_city || ''}
                  autoFocus
                  readOnly
                  id='address_city'
                  className={this.state.field === 'address_city' ? 'red-text' : ''}
                />
              </Col>
              <Col sm={4} md={4}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.field === 'client_phone' ? this.state.changed : this.state.request.client_phone || ''}
                  autoFocus
                  readOnly
                  id='client_phone'
                  className={this.state.field === 'client_phone' ? 'red-text' : ''}
                />
              </Col>
              <Col sm={4} md={4}>
                <Form.Label>Occupation</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.field === 'client_occupation' ? this.state.changed : this.state.request.client_occupation || ''}
                  autoFocus
                  readOnly
                  id='client_occupation'
                  className={this.state.field === 'client_occupation' ? 'red-text' : ''}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.handleModalClose}>
            Close
          </Button>
          <Button variant="primary"
            onClick={this.submitReject}>
            Reject Request
          </Button>
          <Button variant="primary"
            onClick={this.submitWaiting}>
            Not Available
          </Button>
          <Button variant="success"
            onClick={this.submitRectify}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
  }
}
export default Rectificar;