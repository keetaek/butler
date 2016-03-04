const React = require('react');
const { Component, PropTypes } = React;
import { connect } from 'react-redux';
const { ListGroup } = require('react-bootstrap');
const { loadCheckins } = require('redux/modules/checkin');
const { searchGuestbyId } = require('redux/modules/guests');
const CheckinListItem = require('components/CheckinList/CheckinListItem/CheckinListItem');
const { isEmpty } = require('lodash');


function select(state) {
  return {
    checkins: state.checkin.checkins,
    loaded: state.checkin.loaded,
    guests: state.guests.idBasedData,
  };
}

@connect(select)
class CheckinList extends Component {

  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    checkins: PropTypes.array.isRequired,
    guests: PropTypes.object,
    checkinDate: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static defaultProps = {
    loaded: false,
    checkins: [],
  };

  constructor(props) {
    super(props);
    // require('./Checkin.scss');
  }

  componentWillMount() {
    const { checkinDate, dispatch } = this.props;
    console.log('Component Will Mount');
    dispatch(loadCheckins(checkinDate));
  }

  buildCheckinListItems(checkins, guests) {
    if (isEmpty(checkins)) {
      return null;
    }
    return checkins.map((checkin) => {
      const guestId = checkin.guestId;
      console.log('Guest ID', guestId);
      const guest = searchGuestbyId(guests, guestId);
      console.log('Real Guest object', guest);
      return <CheckinListItem guest={guest} {...this.props} />;
    });
  }

  render() {
    const { loaded, checkins, guests } = this.props;
    if (!loaded) {
      // Return loading indicator
    }
    const checkinList = this.buildCheckinListItems(checkins, guests);
    console.log('checkinList', checkinList);
    return (
      <ListGroup componentClass="ul">
        {checkinList}
      </ListGroup>
    );
  }

}

module.exports = CheckinList;
