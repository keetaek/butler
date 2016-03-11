import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { GuestList } from 'components';
const { startGuestForm } = require('redux/modules/guests');

@connect(() => {return {};})
export default class Guests extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  onClickUpdateLinkHandler(guest) {
    return (event) => {
      event.preventDefault();
      this.props.dispatch(startGuestForm(guest));
    };
  }

  render() {
    return (
      <div className="container">
        <h1>Guests</h1>
        <Helmet title="Guests"/>
        <GuestList actionLabel="Update" actionHandler={::this.onClickUpdateLinkHandler} {...this.props} />
      </div>
    );
  }
}
