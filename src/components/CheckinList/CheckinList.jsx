const React = require('react');
const { Component, PropTypes } = React;
const { ListGroup } = require('react-bootstrap');
const { loadCheckins } = require('redux/modules/checkin');
const { searchGuestbyId } = require('redux/modules/guests');
const CheckinListItem = require('components/CheckinList/CheckinListItem/CheckinListItem');
const { isEmpty } = require('lodash');

class CheckinList extends Component {

  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    checkinDate: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    checkins: PropTypes.array,
    guests: PropTypes.object
  };

  componentWillMount() {
    const { checkinDate, dispatch } = this.props;
    dispatch(loadCheckins(checkinDate));
  }

  buildCheckinListItems(checkins, guests) {
    if (isEmpty(checkins)) {
      return null;
    }
    return checkins.map((checkin) => {
      const checkinId = checkin.id;
      const guestId = checkin.guestId;
      const guest = searchGuestbyId(guests, guestId);
      return <CheckinListItem key={checkinId} guest={guest} checkinId={checkinId} {...this.props} />;
    });
  }

  render() {
    const { loaded, checkins, guests } = this.props;
    if (!loaded) {
      // Return loading indicator
    }
    const checkinList = this.buildCheckinListItems(checkins, guests);
    return (
      <ListGroup componentClass="ul">
        {checkinList}
      </ListGroup>
    );
  }

}

module.exports = CheckinList;
