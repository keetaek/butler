import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';
import { GuestList } from 'components';
import { connect } from 'react-redux';
const FormModal = require('../../components/FormModal/FormModal');
const CheckinForm = require('../../components/Checkin/checkinForm');
const { Notification } = require('react-notification');
const clone = require('lodash').clone;
// actions checkinGuest
const { startCheckin } = require('redux/modules/checkin');
const { clearNewGuest } = require('redux/modules/guests');

function select(state) {
  return {
    ...state,
    guests: state.guests,
    checkin: state.checkin
  };
}

@connect(select)
export default class Checkin extends Component {

  static propTypes = {
    selectedGuestId: PropTypes.string,
    updateGuest: PropTypes.bool.isRequired,
    checkinDate: PropTypes.object.isRequired,
    guests: PropTypes.object,
    checkin: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    checkinDate: new Date()
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      showGuestModal: false,
      showCheckinModal: false,
      checkinDate: props.checkinDate,
      selectedGuestId: null
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

  notificationOnClickHandler() {
    const newGuest = clone(this.state.guests.newGuest);
    this.props.dispatch(startCheckin(newGuest)); // start checkin
    this.props.dispatch(clearNewGuest()); // clear guest newGuest
  }

  render() {
    let newGuest;
    let notificationMessage = '';
    let showNotification = false;
    const { guests } = this.props;
    if (guests && guests.newGuest) {
      showNotification = true;
      newGuest = guests.newGuest;
      notificationMessage = `Would you like to check in ${newGuest.first_name}?`;
    }

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
        {/* This is for updating the guest info. The modal for adding a guest will be under GuestList component */}
        <FormModal showModal={this.state.showGuestModal} onClose={::this.closeGuestModal} title={'Check in guest'}>
          <CheckinForm postSubmitAction={::this.closeGuestModal} />
        </FormModal>

        <FormModal showModal={this.state.showCheckinModal} onClose={::this.closeCheckinModal} title={'Check in guest'}>
          <CheckinForm postSubmitAction={::this.closeCheckinModal} />
        </FormModal>
        <Notification
          isActive={showNotification}
          message={notificationMessage}
          action={'Check in'}
          onClick={this.notificationOnClickHandler}
/>
      </div>
    );
  }
}
