import React, { Component, PropTypes } from 'react';
const { Notification } = require('react-notification');
const clearGuestNotification = require('redux/modules/guests').clearNotification;
const clearCheckinNotification = require('redux/modules/checkin').clearNotification;
const { startCheckin } = require('redux/modules/checkin');
const { CREATE_SUCCESS } = require('redux/modules/guests');
const { clone } = require('lodash');

/**
 * Show Checkin Notification based on Guest status and Checkin status
 */
export default class CheckinNotification extends Component {
  static propTypes = {
    guestNotification: PropTypes.shape({
      status: PropTypes.string,
      notificationMessage: PropTypes.string,
      updatedGuest: PropTypes.object
    }),
    checkinNotification: PropTypes.shape({
      status: PropTypes.string,
      notificationMessage: PropTypes.string,
      guest: PropTypes.object
    }),
    dispatch: PropTypes.func
    // showNotification: PropTypes.bool.isRequired,
    // message: PropTypes.string.isRequired,
    // actionText: PropTypes.string,
    // onClickActionHandler: PropTypes.func,
    // onDismissHandler: PropTypes.func,
    // dismissAfter: PropTypes.number,
  }

  notificationOnClickHandler() {
    const updatedGuest = clone(this.props.guestNotification.updatedGuest);
    this.props.dispatch(startCheckin(updatedGuest.id)); // start checkin
    this.dismissNotification();
  }

  dismissNotification() {
    this.props.dispatch(clearGuestNotification());
    this.props.dispatch(clearCheckinNotification());
  }

  render() {
    const { guestNotification, checkinNotification } = this.props;
    let showNotification = false;
    let notificationMessage = '';
    let actionMessage = '';
    let actionOnClick = null;

    if (guestNotification) {
      showNotification = true;
      notificationMessage = guestNotification.notificationMessage;
      if (guestNotification.status === CREATE_SUCCESS) {
        actionMessage = 'Check in';
        actionOnClick = ::this.notificationOnClickHandler;
      }
    } else if (checkinNotification) {
      showNotification = true;
      notificationMessage = checkinNotification.notificationMessage;
    }

    return (
      <Notification
        isActive={showNotification}
        message={notificationMessage}
        action={actionMessage}
        onClick={actionOnClick}
        onDismiss={::this.dismissNotification}
        dismissAfter={2000} />
    );
  }
}
