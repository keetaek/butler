import React, { Component, PropTypes } from 'react';
const { reduxForm } = require('redux-form');
// const checkinFormValidation = require('./checkinFormValidation');
const { addNewGuest } = require('redux/modules/guests');
const { Input } = require('react-bootstrap');

// function select(state) {
//   return {
//     saveError: state.checkinForm.saveError
//   };
// }

// @connect(select)
@reduxForm({
  form: 'checkin',
  fields: ['firstName', 'lastName', 'nickname', 'birthdate', 'gender',
            'emergencyContactName', 'emergencyContactPhone', 'identificationType', 'identificationValue',
            'identificationNeedBy', 'identificationNote',
            'intakeFormCollectDate', 'intakeFormCollectedBy'],
  // validate: checkinFormValidation
})
export default class AddGuestForm extends Component {
  static propTypes = {
    postSubmitAction: PropTypes.func,
    fields: PropTypes.shape({
      firstName: PropTypes.object.isRequired,
      lastName: PropTypes.object.isRequired,
      nickname: PropTypes.object.isRequired,
      birthdate: PropTypes.object.isRequired,
      gender: PropTypes.object.isRequired,
      emergencyContactName: PropTypes.object.isRequired,
      emergencyContactPhone: PropTypes.object.isRequired,
      identificationType: PropTypes.object.isRequired,
      identificationValue: PropTypes.object.isRequired,
      identificationNeedBy: PropTypes.object.isRequired,
      identificationNote: PropTypes.object.isRequired,
      intakeFormCollectDate: PropTypes.object.isRequired,
      intakeFormCollectedBy: PropTypes.object.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleSubmit() {
    const { fields: { firstName, lastName, nickname, birthdate, gender, emergencyContactName, emergencyContactPhone, identificationType, identificationValue, identificationNeedBy, identificationNote, intakeFormCollectDate, intakeFormCollectedBy } } = this.props;

    this.props.dispatch(addNewGuest(firstName.value, lastName.value, nickname.value, birthdate, gender.value, emergencyContactName.value, emergencyContactPhone.value, identificationType.value, identificationValue.value, identificationNeedBy, identificationNote.value, intakeFormCollectDate, intakeFormCollectedBy.value));
  }

  render() {
    const {fields: { firstName, lastName, nickname, birthdate, gender, emergencyContactName, emergencyContactPhone, identificationType, identificationValue, identificationNeedBy, identificationNote, intakeFormCollectDate, intakeFormCollectedBy }, postSubmitAction } = this.props;

    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" onClick={postSubmitAction}>
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
          <h4 className="modal-title">Add a new guest</h4>
        </div>
        <div className="modal-body">
          <form>
            <div>
              <Input type="text" placeholder="First Name" label="First Name" {...firstName} />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" onClick={postSubmitAction}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={::this.handleSubmit}>Add Guest</button>
        </div>
      </div>
    );
  }
}

module.exports = AddGuestForm;
