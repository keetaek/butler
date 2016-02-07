import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { GuestList } from 'components';

export default class Guests extends Component {
  showSnackBar() {
    console.log('Show Snack bar in Guest');
  }

  render() {
    return (
      <div className="container">
        <h1>Guests</h1>
        <Helmet title="Guests"/>
        <GuestList {...this.props} postAddGuestHandler={this.showSnackBar} />
      </div>
    );
  }
}
