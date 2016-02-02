import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';
import { GuestList } from 'components';
const Modal = require('react-modal');
const CheckinForm = require('../../components/Checkin/checkinForm');
const customStyles = {
  overlay: {
    zIndex: 2
  },
  content: {
    padding: 0,
    zIndex: 3,
  }
};
export default class Checkin extends Component {

  static propTypes = {
    initialModalState: PropTypes.bool
  };

  static defaultProps = {
    initialModalState: false
  }

  constructor(props) {
    super(props);
    this.state = { showModal: this.props.initialModalState };
    require('./Checkin.scss');
  }

  checkinHandler(event) {
    event.preventDefault();
    // const dest = event.target.href;
    // const path = event.target.pathname;
    this.openModal();
  }

  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  render() {
    return (
      <div className="container">
        <h1>Check in</h1>
        <Helmet title="Check-in"/>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <GuestList {...this.props} isCheckin checkinHandler={::this.checkinHandler} />
            </Col>
            <Col xs={6} md={4}>
              <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
            </Col>
          </Row>
        </Grid>
        <Modal
          className="Modal__Bootstrap modal-dialog ReactModal__Content--after-open"
          closeTimeoutMS={150}
          isOpen={this.state.showModal}
          onRequestClose={::this.closeModal}
          style={customStyles} >
          <CheckinForm postSubmitAction={::this.closeModal} name="TEST" />
        </Modal>
      </div>
    );
  }
}
