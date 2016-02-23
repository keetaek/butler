import React, {Component, PropTypes} from 'react';
// import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import checkinFormValidation from './checkinFormValidation';
import { checkinGuest } from 'redux/modules/checkin';
const { Input } = require('react-bootstrap');
// function select(state) {
//   return {
//     saveError: state.checkinForm.saveError
//   };
// }

// @connect(select)
@reduxForm({
  form: 'checkin',
  fields: ['feelSafe', 'healthIssue', 'reportedItems', 'note', 'updateGuest'],
  validate: checkinFormValidation
})
export default class CheckinForm extends Component {
  static propTypes = {
    postSubmitAction: PropTypes.func,
    postCancelAction: PropTypes.func,
    guestId: PropTypes.string.isRequired,
    checkinDate: PropTypes.string.isRequired,
    fields: PropTypes.shape({
      feelSafe: PropTypes.object.isRequired,
      healthIssue: PropTypes.object.isRequired,
      reportedItems: PropTypes.object,
      note: PropTypes.object,
      updateGuest: PropTypes.object.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static defaultProps = {
    fields: {
      feelSafe: true,
      healthIssue: false
    }
  }

  handleSubmit() {
    const { fields: { feelSafe, healthIssue, reportedItems, note, updateGuest }, guestId, checkinDate } = this.props;

    this.props.dispatch(checkinGuest(guestId, feelSafe.checked, healthIssue.checked, checkinDate, reportedItems.value, note.value, updateGuest.checked));
    // postSubmitAction is optional
    if (this.props.postSubmitAction) {
      this.props.postSubmitAction();
    }
  }

  render() {
    const {fields: { feelSafe, healthIssue, reportedItems, note, updateGuest }, postCancelAction } = this.props;
    // const styles = require('./addGuestForm.scss');
    return (
      <span>
        <div className="modal-body">
          <form>
            <fieldset>
              <div className="row form-group">
                <Input type="checkbox" label="Feeling Safe?" labelClassName="col-md-4" wrapperClassName="col-md-12" {...feelSafe} />
                <Input type="checkbox" label="Health Issues?" labelClassName="col-md-4" wrapperClassName="col-md-12" {...healthIssue} />
              </div>
              <div className="row form-group">
                <Input type="text" label="Reported Items" labelClassName="col-md-4" wrapperClassName="col-md-12"
                {...reportedItems} />
              </div>
              <div className="row form-group">
                <Input type="textarea" label="Note" placeholder="Comments?" labelClassName="col-md-4" wrapperClassName="col-md-12" {...note} />
              </div>
              <div className="row form-group">
                <Input type="checkbox" label="Would you like to update the guest info?" labelClassName="col-md-4" wrapperClassName="col-md-12" {...updateGuest} />
              </div>
            </fieldset>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" onClick={postCancelAction}>Close</button>
          <button type="button" className="btn btn-primary" onClick={::this.handleSubmit}>Check in</button>
        </div>
      </span>
    );
  }
}

module.exports = CheckinForm;
