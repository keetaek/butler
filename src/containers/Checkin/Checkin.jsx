import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col, Glyphicon, Input } from 'react-bootstrap';
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
const { updateGuest } = require('redux/modules/guests');
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
      checkinDate: moment(),
      showUpdateGuest: false
    };
  }

  onClickCheckinLinkHandler(guest) {
    return (event) => {
      event.preventDefault();
      this.props.dispatch(startCheckin(guest));
    };
  }

  closeCheckin() {
    // Reset showUpdateGuest flag
    this.setState({ showUpdateGuest: false });
    this.props.dispatch(finishCheckin());
  }

  checkinHandler() {
    if (this.state.showUpdateGuest) {
      this.refs.guestForm.submit();
    }
    this.refs.checkinForm.submit();
  }

  toggleUpdateGuest() {
    this.setState({ showUpdateGuest: !this.state.showUpdateGuest });
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
    let guestFormStyle;
    let submitButtonLabel;
    if (this.state.showUpdateGuest) {
      guestFormStyle = style.show_content;
      submitButtonLabel = 'Checkin and Update';
    } else {
      guestFormStyle = style.hide_content;
      submitButtonLabel = 'Checkin';
    }

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
              <GuestList {...this.props} actionLabel="Checkin" actionHandler={::this.onClickCheckinLinkHandler} />
            </Col>
            <Col md={5}>
              <h4 style={{textAlign: 'center'}}>Checked-in Guests</h4>
              <CheckinList loaded={checkinLoaded} checkinDate={this.state.checkinDate} {...this.props}/>
            </Col>
          </Row>
        </Grid>

        <FormModal showModal={showCheckinModal} onClose={::this.closeCheckin} cancelButtonLabel={'Cancel'} submitButtonLabel={submitButtonLabel} cancelHandler={::this.closeCheckin} submitHandler={::this.checkinHandler} title={`Check-in (${formattedCheckinDate}): ${guestFirstName} ${guestLastName}`}>
          <CheckinForm ref="checkinForm" initialValues={{ feelSafe: true, healthIssue: false, guestId: guestId, checkinDate: this.state.checkinDate }} onSubmit={data => {
            dispatch(checkinGuest(data));
          }}/>
          <Input type="checkbox" label="Update Guest" labelClassName="col-md-4" onChange={::this.toggleUpdateGuest} {...this.state.showUpdateGuest} />
          <div className={guestFormStyle}>
            <GuestForm ref="guestForm" initialValues={selectedGuest} onSubmit={data => {
              dispatch(updateGuest(selectedGuest, data));
            }}/>
          </div>
        </FormModal>
         <Notification guestNotification={guestNotification} checkinNotification={checkinNotification} dispatch={dispatch}/>

      </div>
    );
  }
}
