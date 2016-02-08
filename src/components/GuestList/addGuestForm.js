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

    console.log('Gender', this.props.fields.gender);
    return (
      <span>
        <div className="modal-body">
          <form>
            <div>
              <Input type="text" placeholder="First Name" label="First Name" {...firstName} />
              <Input type="text" placeholder="Last Name" label="Last Name" {...lastName} />
              <Input type="text" placeholder="Nickname" label="Nickname" {...nickname} />
              <Input type="date" label="Birthdate" {...birthdate} />

              <Input label="Male" type="radio" name="gender" checked={gender.value === 'male'} value="male" {...gender} />
              <Input label="Female" type="radio" name="gender" checked={gender.value === 'female'} value="female" {...gender} />
              <Input label="MTF" type="radio" name="gender" checked={gender.value === 'mtf'} value="mtf" {...gender} />
              <Input label="FTM" type="radio" name="gender" checked={gender.value === 'ftm'} value="ftm" {...gender} />
              <Input label="Other" type="radio" name="gender" checked={gender.value === 'other'} value="other" {...gender} />

              <Input type="text" placeholder="name" label="Emergency Contact" {...emergencyContactName} />
              <Input type="tel" label="Emergency Contact #" {...emergencyContactPhone} />

              <Input type="select" label="Identification Type" placeholder="select" {...identificationType}>
                <option value="state">State Id</option>
                <option value="driver">Driver</option>
                <option value="passport">Passport</option>
                <option value="other">Other</option>
              </Input>
              <Input type="text" placeholder="name" label="Identification #" {...identificationValue} />
              <Input type="date" label="ID need by" {...identificationNeedBy} />
              <Input type="text" placeholder="note" label="Note" {...identificationNote} />

              <Input type="date" label="Collection Date" {...intakeFormCollectDate} />
              <Input type="text" label="Collected By" {...intakeFormCollectedBy} />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" onClick={postSubmitAction}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={::this.handleSubmit}>Add Guest</button>
        </div>
      </span>
    );
  }
}

module.exports = AddGuestForm;
