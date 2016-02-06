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
    initialModalState: PropTypes.bool,
    selectedGuestId: PropTypes.string,
    checkinDate: PropTypes.object.isRequired
  };

  static defaultProps = {
    initialModalState: false,
    checkinDate: new Date()
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: props.initialModalState,
      checkinDate: props.checkinDate
    };
    require('./Checkin.scss');
  }

  checkinHandler(event) {
    event.preventDefault();
    const path = event.target.pathname;
    const checkinGuestId = path.match(/\/checkin\/(\d+)/)[1];
    // TODO - Check if the checkinGuestId is null (then save raven error)
    this.setState({selectedGuestId: checkinGuestId });
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
          <CheckinForm guestId={this.state.selectedGuestId} checkinDate={this.state.checkinDate} postSubmitAction={::this.closeModal} name="TEST" />
        </Modal>
      </div>
    );
  }
}
