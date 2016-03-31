import React, { Component, PropTypes } from 'react';
const NotificationSystem = require('react-notification-system');
const clearGuestNotification = require('redux/modules/guests').clearNotification;
const clearCheckinNotification = require('redux/modules/checkin').clearNotification;
const { startCheckin, CHECKIN_FAIL, START_CHECKIN_FAIL } = require('redux/modules/checkin');
const { CREATE_SUCCESS, CREATE_FAIL, UPDATE_FAIL } = require('redux/modules/guests');

// const { clone } = require('lodash');

/**
 * Show Checkin Notification based on Guest status and Checkin status
 */
export default class CheckinNotification extends Component {
  static propTypes = {
    guestNotification: PropTypes.shape({
      status: PropTypes.string,
      data: PropTypes.object
    }),
    checkinNotification: PropTypes.shape({
      status: PropTypes.string,
      data: PropTypes.object
    }),
    dispatch: PropTypes.func
  }

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    const { guestNotification, checkinNotification, dispatch } = nextProps;
    this.addNotifications(guestNotification, checkinNotification, dispatch);
  }

  static notificationSystem = null;

  addNotifications(guestNotification, checkinNotification, dispatch) {
    if (guestNotification) {
      const guest = guestNotification.data;
      switch (guestNotification.status) {
        case CREATE_SUCCESS:
          this.notificationSystem.addNotification({
            message: `Guest ${guest.firstName} has been added to the system!`,
            level: 'success',
            action: {
              label: 'Checkin',
              callback: () => {
                dispatch((startCheckin(guest)));
              }
            },
            uid: `${CREATE_SUCCESS}.${guest.firstName}.${guest.lastName}`,
            onRemove: () => {
              dispatch(clearGuestNotification());
            }
          });
          break;
        case CREATE_FAIL:
          this.notificationSystem.addNotification({
            message: `There was a problem while creating a new user. Please try again`,
            level: 'error',
            autoDismiss: 5,
            uid: `${CREATE_FAIL}`,
            onRemove: () => {
              dispatch(clearGuestNotification());
            }
          });
          break;
        case UPDATE_FAIL:
          this.notificationSystem.addNotification({
            message: `There was a problem while updating a user. Please try again`,
            level: 'error',
            autoDismiss: 5,
            uid: `${UPDATE_FAIL}`,
            onRemove: () => {
              dispatch(clearGuestNotification());
            }
          });
          break;
        default:
          break;
      }
    }
    if (checkinNotification) {
      const checkinData = checkinNotification.data;
      switch (checkinNotification.status) {
        case CHECKIN_FAIL:
          this.notificationSystem.addNotification({
            message: `There was a problem while checking in a user. Please try again`,
            level: 'error',
            autoDismiss: 5,
            uid: `${CHECKIN_FAIL}`,
            onRemove: () => {
              dispatch(clearCheckinNotification());
            }
          });
          break;
        case START_CHECKIN_FAIL:
          const reason = checkinData.reason;
          this.notificationSystem.addNotification({
            message: `${reason}`,
            level: 'error',
            autoDismiss: 5,
            uid: `${START_CHECKIN_FAIL}`,
            onRemove: () => {
              dispatch(clearCheckinNotification());
            }
          });
          break;
        default:
          break;
      }
    }
  }

  render() {
    return (
      <NotificationSystem ref="notificationSystem" />
    );
  }
}
