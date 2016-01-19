import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import * as guestActions from 'redux/modules/guests';
import {isLoaded, loadAll as loadGuests} from 'redux/modules/guests';
// import {initializeWithKey} from 'redux-form';

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGuests());
  }
}

@connectData(fetchData)
@connect(
  state => ({
    guests: state.guests.data,
    error: state.guests.error,
    loading: state.guests.loading
  }),
  {...guestActions })
export default class Guests extends Component {
  static propTypes = {
    guests: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    loadAll: PropTypes.func.isRequired
  }

  render() {
    console.log ("KEETAEK");
    // const {guests, error, loading, loadAll} = this.props;
    const { guests } = this.props;
    const styles = require('../Widgets/Widgets.scss');
    console.log('KEETAEK ' + JSON.stringify(this.props));
    return (
      <div className="container">
        <h1>Guests</h1>
        <Helmet title="Guests"/>
        {guests && guests.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th className={styles.idCol}>ID</th>
            <th className={styles.colorCol}>Color</th>
            <th className={styles.sprocketsCol}>Sprockets</th>
            <th className={styles.ownerCol}>Owner</th>
            <th className={styles.buttonCol}></th>
          </tr>
          </thead>
          <tbody>
          {
            guests.map((guest) =>
              <tr key={guest.id}>
                <td className={styles.idCol}>{guest.id}</td>
                <td className={styles.colorCol}>{guest.first_name}</td>
                <td className={styles.sprocketsCol}>{guest.last_name}</td>
                <td className={styles.ownerCol}>{guest.birthdate}</td>
                <td className={styles.buttonCol}>
                  button
                </td>
              </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}
