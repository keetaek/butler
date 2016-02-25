import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';
import { GuestList } from 'components';
import { connect } from 'react-redux';
const FormModal = require('../../components/FormModal/FormModal');
const CheckinForm = require('../../components/Checkin/checkinForm');
const Guestform = require('components/GuestList/GuestForm');
const { Notification } = require('react-notification');
const clone = require('lodash').clone;
// actions checkinGuest
const { startCheckin, cancelCheckin, cancelGuestUpdate } = require('redux/modules/checkin');
const { clearNewGuest, hideGuestNotification } = require('redux/modules/guests');

function select(state) {
  return {
    ...state,
    guests: state.guests,
    showNotification: state.guests.showNotification,
    notificationMessage: state.guests.notificationMessage,
    selectedGuestId: state.checkin.selectedGuestId,
    showCheckinModal: state.checkin.showCheckinModal,
    showGuestModal: state.checkin.showGuestModal,
    checkinDate: state.checkin.checkinDate,
    loaded: state.checkin.loaded
  };
}

@connect(select)
export default class Checkin extends Component {

  static propTypes = {
    guests: PropTypes.shape({
      newGuest: PropTypes.object.isOptional,
    }),
    selectedGuestId: PropTypes.string,
    notificationMessage: PropTypes.string,
    showCheckinModal: PropTypes.bool.isRequired,
    showGuestModal: PropTypes.bool.isRequired,
    showNotification: PropTypes.bool.isRequired,
    checkinDate: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    showNotification: false,
    notificationMessage: '',
    selectedGuestId: null,
    showCheckinModal: false,
    showGuestModal: false,
    checkinDate: new Date(),
    loaded: false
  };

  constructor(props) {
    super(props);
    require('./Checkin.scss');
  }

  checkinHandler(event) {
    event.preventDefault();
    const path = event.target.pathname;
    const checkinGuestId = path.match(/\/checkin\/(\d+)/)[1];
    this.props.dispatch(this.props.dispatch(startCheckin(checkinGuestId)));
  }

  closeGuestUpdate() {
    this.props.dispatch(cancelGuestUpdate());
  }

  closeCheckin() {
    this.props.dispatch(cancelCheckin());
  }

  notificationOnClickHandler() {
    const newGuest = clone(this.props.guests.newGuest);
    this.props.dispatch(startCheckin(newGuest.id)); // start checkin
    this.props.dispatch(clearNewGuest()); // clear guest newGuest
  }

  // Dismiss the notification.
  dismissNotification() {
    this.props.dispatch(hideGuestNotification());
  }

  render() {
    const { showCheckinModal, showGuestModal, checkinDate, showNotification, notificationMessage, selectedGuestId } = this.props;

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
        <FormModal showModal={showGuestModal} onClose={::this.closeGuestUpdate} title={'Update Guest'}>
          <Guestform postCancelAction={::this.closeGuestUpdate} guestIdForUpdate={selectedGuestId} />
        </FormModal>

        <FormModal showModal={showCheckinModal} onClose={::this.closeCheckin} title={'Check in guest'}>
          <CheckinForm postCancelAction={::this.closeCheckin} guestId={selectedGuestId} checkinDate={checkinDate} />
        </FormModal>

        <Notification
          isActive={showNotification}
          message={notificationMessage}
          action={'Check in'}
          onClick={::this.notificationOnClickHandler}
          onDismiss={::this.dismissNotification}
          dismissAfter={2000}
/>
      </div>
    );
  }
}
