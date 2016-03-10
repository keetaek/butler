import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
// import checkinFormValidation from './checkinFormValidation';
const { Input } = require('react-bootstrap');

@reduxForm({
  form: 'checkin',
  fields: ['guestId', 'checkinDate', 'feelSafe', 'healthIssue', 'reportedItems', 'note', 'updateGuest']
  // validate: checkinFormValidation
})
export default class CheckinForm extends Component {
  static propTypes = {
    selectedGuest: PropTypes.object,
    fields: PropTypes.shape({
      guestId: PropTypes.object.isRequired,
      checkinDate: PropTypes.object.isRequired,
      feelSafe: PropTypes.object.isRequired,
      healthIssue: PropTypes.object.isRequired,
      updateGuest: PropTypes.object.isRequired,
      reportedItems: PropTypes.object,
      note: PropTypes.object
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render() {
    const { feelSafe, healthIssue, reportedItems, note } = this.props.fields;

    return (
      <span>
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
          </fieldset>
        </form>
      </span>
    );
  }
}

module.exports = CheckinForm;
