import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { GuestList } from 'components';

export default class Guests extends Component {
  render() {
    return (
      <div className="container">
        <h1>Guests</h1>
        <Helmet title="Guests"/>
        <GuestList {...this.props}/>
      </div>
    );
  }
}
