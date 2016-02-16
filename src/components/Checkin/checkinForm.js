import React, {Component, PropTypes} from 'react';
// import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import checkinFormValidation from './checkinFormValidation';
import { checkin } from 'redux/modules/checkin';
const { Input } = require('react-bootstrap');
// function select(state) {
//   return {
//     saveError: state.checkinForm.saveError
//   };
// }

// @connect(select)
@reduxForm({
  form: 'checkin',
  fields: ['feelSafe', 'healthIssue', 'reportedItems', 'note'],
  validate: checkinFormValidation
})
export default class CheckinForm extends Component {
  static propTypes = {
    postSubmitAction: PropTypes.func,
    guestId: PropTypes.string.isRequired,
    checkinDate: PropTypes.object.isRequired,
    fields: PropTypes.shape({
      feelSafe: PropTypes.object.isRequired,
      healthIssue: PropTypes.object.isRequired,
      reportedItems: PropTypes.object.isOptional,
      note: PropTypes.object.isOptional,
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
    const { fields: { feelSafe, healthIssue, reportedItems, note }, guestId, checkinDate } = this.props;

    this.props.dispatch(checkin(guestId, feelSafe.checked, healthIssue.checked, checkinDate, reportedItems.value, note.value));

    this.props.postSubmitAction();
  }

  render() {
    const {fields: { feelSafe, healthIssue, reportedItems, note }, postSubmitAction } = this.props;
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
                <Input type="textarea" label="Note" placeholder="Comments?" labelClassName="col-md-4" wrapperClassName="col-md-12" {...note} />
              </div>
            </fieldset>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" onClick={postSubmitAction}>Close</button>
          <button type="button" className="btn btn-primary" onClick={::this.handleSubmit}>Check in</button>
        </div>
      </span>
    );
  }
}

module.exports = CheckinForm;
