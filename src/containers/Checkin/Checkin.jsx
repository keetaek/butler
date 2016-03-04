import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';
import { GuestList } from 'components';
import { connect } from 'react-redux';
const FormModal = require('components/FormModal/FormModal');
const CheckinForm = require('components/Checkin/checkinForm');
const GuestForm = require('components/GuestList/GuestForm');
const CheckinList = require('components/CheckinList/CheckinList');
const Notification = require('components/CheckinNotification/CheckinNotification');
const { startCheckin, finishCheckin, checkinGuest } = require('redux/modules/checkin');
const { updateGuest, searchGuestbyId } = require('redux/modules/guests');
const moment = require('moment');

function select(state) {
  return {
    guestNotification: state.guests.notification,
    guests: state.guests.idBasedData,
    checkins: state.checkin.checkins,
    showCheckinModal: state.checkin.showCheckinModal,
    checkinNotification: state.checkin.notification,
    selectedGuest: state.checkin.selectedGuest,
    checkinLoaded: state.checkin.loaded
  };
}

@connect(select)
export default class Checkin extends Component {

  static propTypes = {
    guestNotification: PropTypes.shape({
      status: PropTypes.string,
      data: PropTypes.object
    }),
    checkinNotification: PropTypes.shape({
      status: PropTypes.string,
      data: PropTypes.object
    }),
    selectedGuest: PropTypes.object,
    showCheckinModal: PropTypes.bool.isRequired,
    checkinDate: PropTypes.object.isRequired,
    guests: PropTypes.object,
    checkins: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    checkinLoaded: PropTypes.bool.isRequired
  };

  static defaultProps = {
    notificationMessage: '',
    selectedGuest: null,
    showCheckinModal: false,
    checkinDate: new Date(),
    checkins: [],
    checkinLoaded: false
  };

  constructor(props) {
    super(props);
  }

  onClickCheckinLinkHandler(event) {
    event.preventDefault();
    const path = event.target.pathname;
    const checkinGuestId = path.match(/\/checkin\/(\d+)/)[1];
    const guest = searchGuestbyId(this.props.guests, checkinGuestId);
    this.props.dispatch(startCheckin(guest));
  }

  closeCheckin() {
    this.props.dispatch(finishCheckin());
  }

  checkinHandler() {
    this.refs.checkinForm.submit();
    this.refs.guestForm.submit();
    this.props.dispatch(finishCheckin());
  }

  render() {
    const { showCheckinModal, selectedGuest, checkinDate, guestNotification, checkinNotification, dispatch, checkinLoaded } = this.props;

    let guestId = null;
    let guestFirstName = null;
    let guestLastName = null;
    if (selectedGuest) {
      guestId = selectedGuest.id;
      guestFirstName = selectedGuest.firstName;
      guestLastName = selectedGuest.lastName;
    }
    const style = require('./Checkin.scss');
    return (
      <div className="container">
        <h1>Check in</h1>
        <Helmet title="Check-in"/>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8} className={style.vertical_line}>
              <GuestList {...this.props} isCheckin checkinHandler={::this.onClickCheckinLinkHandler} />
            </Col>
            <Col xs={6} md={4}>
              <h2 className={style.text_center}>{moment(checkinDate).format('MM/DD/YYYY')}</h2>
              <CheckinList loaded={checkinLoaded} {...this.props}/>
            </Col>
          </Row>
        </Grid>

        <FormModal showModal={showCheckinModal} onClose={::this.closeCheckin} cancelButtonLabel={'Cancel'} submitButtonLabel={'Save'} cancelHandler={::this.closeCheckin} submitHandler={::this.checkinHandler} title={`Check-in:  ${guestFirstName} ${guestLastName}`}>
          <CheckinForm ref="checkinForm" initialValues={{ feelSafe: true, healthIssue: false, guestId: guestId, checkinDate: checkinDate }} selectedGuest={selectedGuest} onSubmit={data => {
            dispatch(checkinGuest(data));
          }}/>
          <hr />
          <GuestForm ref="guestForm" initialValues={selectedGuest} onSubmit={data => {
            dispatch(updateGuest(guestId, data));
          }}/>
        </FormModal>

         <Notification guestNotification={guestNotification} checkinNotification={checkinNotification} dispatch={dispatch}/>

      </div>
    );
  }
}
