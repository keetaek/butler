import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';
import { GuestList } from 'components';
import { connect } from 'react-redux';
const FormModal = require('components/FormModal/FormModal');
const CheckinForm = require('components/Checkin/checkinForm');
const GuestForm = require('components/GuestList/GuestForm');
const Notification = require('components/CheckinNotification/CheckinNotification');
const { startCheckin, finishCheckin, checkinGuest } = require('redux/modules/checkin');
const { updateGuest } = require('redux/modules/guests');

function select(state) {
  return {
    ...state,
    guestNotification: state.guests.notification,
    checkinNotification: state.checkin.notification,
    selectedGuestId: state.checkin.selectedGuestId,
    showCheckinModal: state.checkin.showCheckinModal,
    checkinDate: state.checkin.checkinDate,
    loaded: state.checkin.loaded
  };
}

@connect(select)
export default class Checkin extends Component {

  static propTypes = {
    guestNotification: PropTypes.shape({
      status: PropTypes.string,
      notificationMessage: PropTypes.string,
      updatedGuest: PropTypes.object
    }),
    checkinNotification: PropTypes.shape({
      status: PropTypes.string,
      notificationMessage: PropTypes.string,
      updatedGuest: PropTypes.object
    }),
    selectedGuestId: PropTypes.string,
    showCheckinModal: PropTypes.bool.isRequired,
    checkinDate: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notificationMessage: '',
    selectedGuestId: null,
    showCheckinModal: false,
    checkinDate: new Date(),
    loaded: false
  };

  constructor(props) {
    super(props);
    require('./Checkin.scss');
  }

  onClickCheckinLinkHandler(event) {
    event.preventDefault();
    const path = event.target.pathname;
    const checkinGuestId = path.match(/\/checkin\/(\d+)/)[1];
    this.props.dispatch(startCheckin(checkinGuestId));
  }

  closeCheckin() {
    this.props.dispatch(finishCheckin());
  }

  checkinHandler() {
    this.refs.checkinForm.submit();
    this.refs.updateGuestForm.submit();
    this.props.dispatch(finishCheckin());
  }

  render() {
    const { showCheckinModal, checkinDate, selectedGuestId, guestNotification, checkinNotification, dispatch } = this.props;

    return (
      <div className="container">
        <h1>Check in</h1>
        <Helmet title="Check-in"/>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <GuestList {...this.props} isCheckin checkinHandler={::this.onClickCheckinLinkHandler} />
            </Col>
            <Col xs={6} md={4}>
              <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
            </Col>
          </Row>
        </Grid>

        <FormModal showModal={showCheckinModal} onClose={::this.closeCheckin} cancelButtonLabel={'Cancel'} submitButtonLabel={'Save'} cancelHandler={::this.closeCheckin} submitHandler={::this.checkinHandler} title={'Check-in'}>
          <CheckinForm ref="checkinForm" onSubmit={data => {
            dispatch(checkinGuest(data));
          }}/>
          <hr />
          <GuestForm ref="guestForm" onSubmit={data => {
            dispatch(updateGuest(data));
          }}/>
        </FormModal>

        <Notification guestNotification={guestNotification} checkinNotification={checkinNotification} dispatch={dispatch}/>

      </div>
    );
  }
}
