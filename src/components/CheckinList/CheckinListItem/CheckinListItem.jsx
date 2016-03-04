const React = require('react');
const { Component, PropTypes } = React;
const { Button, Glyphicon } = require('react-bootstrap');
const { deleteCheckin } = require('redux/modules/checkin');

class CheckinListItem extends Component {

  static propTypes = {
    guest: PropTypes.object.isRequired,
    checkinId: PropTypes.number.isRequired,
    dispatch: PropTypes.func
  };

  render() {
    const { checkinId, guest, dispatch } = this.props;
    const styles = require('./CheckinListItem.scss');
    return (
      <li
        className="list-group-item">
        {guest.firstName} {guest.lastName}
        <span className={styles.delete_button}>
          <Button bsClass="btn" bsStyle="danger" bsSize="xs" onClick={() => {
            dispatch(deleteCheckin(checkinId));
          }}>
          <Glyphicon glyph="minus" /></Button>
        </span>
      </li>
    );
  }
}

module.exports = CheckinListItem;
