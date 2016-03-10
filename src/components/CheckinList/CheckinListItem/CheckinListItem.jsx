const React = require('react');
const { Component, PropTypes } = React;
const { Button, Glyphicon, Panel, Input } = require('react-bootstrap');
const { deleteCheckin } = require('redux/modules/checkin');

class CheckinListItem extends Component {

  static propTypes = {
    guest: PropTypes.object.isRequired,
    checkin: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  togglePanel() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { checkin, guest, dispatch } = this.props;
    const styles = require('./CheckinListItem.scss');
    return (
      <li
        className="list-group-item">
        {guest.firstName} {guest.lastName}
        <span className={styles.buttons}>
          <Button bsClass="btn" bsStyle="danger" bsSize="xs" onClick={() => {
            dispatch(deleteCheckin(checkin.id));
          }}>
          <Glyphicon glyph="minus" /></Button>
        </span>
        <span className={styles.buttons}>
          <Button bsClass="btn" bsSize="xs" onClick={() => {
            ::this.togglePanel();
          }}>
          <Glyphicon glyph="search" /></Button>
        </span>
        {/* Trying to remove the default bootstrap class. */}
        <Panel bsClass="class_not_exist" collapsible expanded={this.state.open}>
          <Input type="checkbox" label="Feel Safe?" checked={checkin.feelSafe} readOnly disabled />
          <Input type="checkbox" label="Health Issue?" checked={checkin.healthIssue} readOnly disabled />
          <Input type="text" label="Reported Items" value={checkin.reportedItems || 'No reported Items'} disabled />
          <Input type="text" label="Note" value={checkin.note || 'No comments'} disabled />
        </Panel>
      </li>
    );
  }
}

module.exports = CheckinListItem;
