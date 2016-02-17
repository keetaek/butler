import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';
import { GuestList } from 'components';
const FormModal = require('../../components/FormModal/FormModal');
const CheckinForm = require('../../components/Checkin/checkinForm');
const AddGuestForm = require('../../components/GuestList/addGuestForm');

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
      showGuestModal: props.initialModalState,
      showCheckinModal: props.initialModalState,
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
    this.openCheckinModal();
  }

  openGuestModal() {
    this.setState({showGuestModal: true});
  }

  closeGuestModal() {
    this.setState({showGuestModal: false});
  }

  openCheckinModal() {
    this.setState({showCheckinModal: true});
  }

  closeCheckinModal() {
    this.setState({showCheckinModal: false});
  }

  showSnackBar() {
    console.log('Implement something.');
    console.log('');
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
        <FormModal showModal={this.state.showGuestModal} onClose={::this.closeGuestModal} title={'Add New Guest'}>
          <AddGuestForm postSubmitAction={::this.closeGuestModal} />
        </FormModal>
        <FormModal showModal={this.state.showCheckinModal} onClose={::this.closeCheckinModal} title={'Check in guest'}>
          <CheckinForm postSubmitAction={::this.closeCheckinModal} />
        </FormModal>
      </div>
    );
  }
}
