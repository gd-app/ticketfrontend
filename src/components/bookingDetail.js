import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButton from 'react-bootstrap/ToggleButton';
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

class BookingDetail extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      showBookingDetail: true,
      custName: "",
      custEmail: ""
      
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

 
  handleShow(e){

  }
  handleClose(e){
    this.props.handleClose(e)
  }
  handleSave(mv, mt,custName,custEmail){
    this.props.handlePurchase(mv, mt,custName,custEmail)
  }
  render() {
    var mv = this.props.movie;
    var mt = this.props.movieTime;
    var sSeat = this.props.selectedSeat
    var show = true;
    return(
      <>
        <Modal show={show} onHide={() => this.handleClose()} backdrop="static"
        keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>{mv.name} - {mt.From}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>You have selected Seat </h5>
           
              {sSeat.map((s) => (
                  <ToggleButton id="tbg-check-{s}" value={s} 
                  variant="primary" disable={true}>
                  {s} 
              </ToggleButton>
              ))}
             
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext onChange={e => this.setState({ custName: e.target.value })} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext  onChange={e => this.setState({ custEmail: e.target.value })} />
              </Col>
            </Form.Group>
          </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.handleSave( mv, mt)}>
              Checkout
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
      
  }
}


export default BookingDetail;
