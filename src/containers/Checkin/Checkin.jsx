import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { GuestList } from 'components';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';
require('react-day-picker/lib/style.css');
const FormModal = require('components/FormModal/FormModal');
const CheckinForm = require('components/Checkin/checkinForm');
const GuestForm = require('components/GuestList/GuestForm');
const CheckinList = require('components/CheckinList/CheckinList');
const ButlerPopover = require('components/ButlerPopover/ButlerPopover');
const Notification = require('components/CheckinNotification/CheckinNotification');
const { startCheckin, finishCheckin, checkinGuest } = require('redux/modules/checkin');
const { updateGuest, searchGuestbyId } = require('redux/modules/guests');
const moment = require('moment');
const { loadCheckins } = require('redux/modules/checkin');

function select(state) {
  return {
    guestNotification: state.guests.notification,
    guests: state.guests.idBasedData,
    checkins: state.checkin.checkins,
    showCheckinModal: state.checkin.showCheckinModal,
    checkinNotification: state.checkin.notification,
    selectedGuest: state.checkin.selectedGuest,
    checkinLoaded: state.checkin.loaded,
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
    guests: PropTypes.object,
    checkins: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    checkinLoaded: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    notificationMessage: '',
    selectedGuest: null,
    showCheckinModal: false,
    checkins: [],
    checkinLoaded: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      checkinDate: moment()
    };
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
  handleCheckinDateChange(event, date) {
    event.preventDefault();
    // Hide popover
    this.refs.butlerPopover.togglePopover();
    this.setState({ checkinDate: date });
    this.props.dispatch(loadCheckins(date));
  }

  render() {
    const { showCheckinModal, selectedGuest, guestNotification, checkinNotification, dispatch, checkinLoaded } = this.props;

    let guestId = null;
    let guestFirstName = null;
    let guestLastName = null;
    if (selectedGuest) {
      guestId = selectedGuest.id;
      guestFirstName = selectedGuest.firstName;
      guestLastName = selectedGuest.lastName;
    }
    const formattedCheckinDate = moment(this.state.checkinDate).format('MM-DD-YYYY');
    const style = require('./Checkin.scss');
    return (
      <div className="container">
        <h1 className={style.header_inline}>Check in</h1>
        <h3 className={`${style.header_inline} ${style.header_spacing}`}>
          <ButlerPopover ref="butlerPopover" id="datePickerPopover" popoverContent={(<DayPicker onDayClick={ ::this.handleCheckinDateChange} />)}>
            <a>
              {formattedCheckinDate}
              <Glyphicon glyph="calendar" className={style.calendar}/>
            </a>
          </ButlerPopover>
        </h3>
        <Helmet title="Check-in"/>
        <hr style={{marginTop: '0px', marginBottom: '10px'}}/>
        <Grid>
          <Row className="show-grid">
            <Col md={7} className={style.vertical_line}>
              <GuestList {...this.props} isCheckin checkinHandler={::this.onClickCheckinLinkHandler} />
            </Col>
            <Col md={5}>
              <h4 style={{textAlign: 'center'}}>Checked-in Guests</h4>
              <CheckinList loaded={checkinLoaded} checkinDate={this.state.checkinDate} {...this.props}/>
            </Col>
          </Row>
        </Grid>

        <FormModal showModal={showCheckinModal} onClose={::this.closeCheckin} cancelButtonLabel={'Cancel'} submitButtonLabel={'Save'} cancelHandler={::this.closeCheckin} submitHandler={::this.checkinHandler} title={`Check-in (${formattedCheckinDate}): ${guestFirstName} ${guestLastName}`}>
          <CheckinForm ref="checkinForm" initialValues={{ feelSafe: true, healthIssue: false, guestId: guestId, checkinDate: this.state.checkinDate }} selectedGuest={selectedGuest} onSubmit={data => {
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
