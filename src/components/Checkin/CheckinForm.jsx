import React, {Component, PropTypes} from 'react';
// import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import checkinFormValidation from './checkinFormValidation';
import { checkinGuest } from 'redux/modules/checkin';
const { Input } = require('react-bootstrap');

@reduxForm({
  form: 'checkin',
  fields: ['id', 'checkinDate', 'feelSafe', 'healthIssue', 'reportedItems', 'note', 'updateGuest'],
  validate: checkinFormValidation
})
export default class CheckinForm extends Component {
  static propTypes = {
    postSubmitAction: PropTypes.func,
    selectedGuest: PropTypes.object,
    fields: PropTypes.shape({
      id: PropTypes.object.isRequired,
      checkinDate: PropTypes.object.isRequired,
      feelSafe: PropTypes.object.isRequired,
      healthIssue: PropTypes.object.isRequired,
      updateGuest: PropTypes.object.isRequired,
      reportedItems: PropTypes.object,
      note: PropTypes.object
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  // TODO remove once the handler is confirmed to be working fine outside this jsx
  handleSubmit() {
    const { fields: { id, feelSafe, healthIssue, reportedItems, note, updateGuest }, selectedGuest, checkinDate } = this.props;

    this.props.dispatch(checkinGuest(selectedGuest, feelSafe.checked, healthIssue.checked, checkinDate, reportedItems.value, note.value, updateGuest.checked));
    // postSubmitAction is optional
    if (this.props.postSubmitAction) {
      this.props.postSubmitAction();
    }
  }

  render() {
    const {fields: { feelSafe, healthIssue, reportedItems, note } } = this.props;
    
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
              {/*<div className="row form-group">
                <Input type="checkbox" label="Would you like to update the guest info?" labelClassName="col-md-4" wrapperClassName="col-md-12" {...updateGuest} />
              </div>*/}
            </fieldset>
          </form>
        </div>
      </span>
    );
  }
}

module.exports = CheckinForm;
