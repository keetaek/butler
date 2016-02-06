import React, {Component, PropTypes} from 'react';
// import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import checkinFormValidation from './checkinFormValidation';
import { checkin } from 'redux/modules/checkin';

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
    // currentValue: PropTypes.object,
    messages: PropTypes.object,
    name: PropTypes.string,
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
    // this.props.postSubmitAction();
  }

  render() {
    const {fields: { feelSafe, healthIssue, reportedItems, note }, postSubmitAction } = this.props;
    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" onClick={postSubmitAction}>
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
          <h4 className="modal-title">Modal title</h4>
        </div>
        <div className="modal-body">
          <form>
            <div>
              <label>
                <input type="checkbox" {...feelSafe}/> Feeling safe?
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" {...healthIssue}/> Any health issue?
              </label>
            </div>
            <div>
              <label>Items to report?</label>
              <div>
                <input type="text" placeholder="Items" {...reportedItems}/>
              </div>
            </div>
            <div>
              <label>Note</label>
              <div>
                <input type="text" placeholder="comment..." {...note}/>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" onClick={postSubmitAction}>Close</button>
          <button type="button" className="btn btn-primary" onClick={::this.handleSubmit}>Check in</button>
        </div>
      </div>
    );
  }
}

module.exports = CheckinForm;
