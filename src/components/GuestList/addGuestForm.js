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
  form: 'addGuest',
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

    this.props.dispatch(addNewGuest(firstName.value, lastName.value, nickname.value, birthdate.value, gender.value, emergencyContactName.value, emergencyContactPhone.value, identificationType.value, identificationValue.value, identificationNeedBy.value, identificationNote.value, intakeFormCollectDate.value, intakeFormCollectedBy.value));

    this.props.postSubmitAction();
  }

  render() {
    const {fields: { firstName, lastName, nickname, birthdate, gender, emergencyContactName, emergencyContactPhone, identificationType, identificationValue, identificationNeedBy, identificationNote, intakeFormCollectDate, intakeFormCollectedBy }, postSubmitAction } = this.props;
    const styles = require('./addGuestForm.scss');
    return (
      <span>
        <div className="modal-body">
          <form>
            <fieldset>
              <h4>Basic Info</h4>
              <div className="row form-group">
                <Input type="text" placeholder="First Name" label="First Name" labelClassName="col-md-2" wrapperClassName="col-md-4" groupClassName={styles.inline_form_group} {...firstName} />
                <Input type="text" placeholder="Last Name" label="Last Name" labelClassName="col-md-2" wrapperClassName="col-md-4" groupClassName={styles.inline_form_group} {...lastName} />
              </div>
              <div className="row form-group">
                <Input type="text" placeholder="Nickname" label="Nickname" labelClassName="col-md-2" wrapperClassName="col-md-4"
                groupClassName={styles.inline_form_group}
                {...nickname} />
                <Input type="date" label="Birthdate" labelClassName="col-md-2" wrapperClassName="col-md-4"
                groupClassName={styles.inline_form_group}
                {...birthdate} />
              </div>
              <div className="row">
                <label className={'col-md-2 ' + styles.label_margin}
                  >Gender</label>
                 <Input label="Male" type="radio" name="gender" checked={gender.value === 'male'} value="male" groupClassName="radio-inline {styles.inline_form_group}" {...gender} />
                <Input label="Female" type="radio" name="gender" checked={gender.value === 'female'} value="female" groupClassName="radio-inline" {...gender} />
                <Input label="MTF" type="radio" name="gender" checked={gender.value === 'mtf'} value="mtf" groupClassName="radio-inline"{...gender} />
                <Input label="FTM" type="radio" name="gender" checked={gender.value === 'ftm'} value="ftm" groupClassName="radio-inline"{...gender} />
                <Input label="Other" type="radio" name="gender" checked={gender.value === 'other'} value="other" groupClassName="radio-inline"{...gender} />
              </div>
            </fieldset>
            <fieldset>
              <h4>Emergency Contact</h4>
              <div className="row form-group">
                <Input type="text" placeholder="name" label="Name"
                labelClassName="col-md-2" wrapperClassName="col-md-4"
                groupClassName={styles.inline_form_group} {...emergencyContactName} />
              <Input type="tel" label="Phone Number" labelClassName="col-md-2" wrapperClassName="col-md-4"
                groupClassName={styles.inline_form_group} {...emergencyContactPhone} />
              </div>
            </fieldset>
            <fieldset>
              <h4>Documents</h4>
              <div className="row form-group">
                <Input type="select" label="Identification Type" placeholder="select" labelClassName="col-md-2" wrapperClassName="col-md-4"
                groupClassName={styles.inline_form_group} {...identificationType}>
                  <option value="state">State Id</option>
                  <option value="driver">Driver</option>
                  <option value="passport">Passport</option>
                  <option value="other">Other</option>
                </Input>
                <Input type="text" label="Identification #" labelClassName="col-md-2" wrapperClassName="col-md-4"
                groupClassName={styles.inline_form_group} {...identificationValue} />
              </div>
              <div className="row form-group">
                <Input type="date" label="ID need by" labelClassName="col-md-2" wrapperClassName="col-md-4"
                groupClassName={styles.inline_form_group} {...identificationNeedBy} />
                <Input type="text" placeholder="note" label="Note" labelClassName="col-md-2" wrapperClassName="col-md-4"
                groupClassName={styles.inline_form_group} {...identificationNote} />
              </div>
              <div className="row form-group">
                <Input type="date" label="Collection Date" labelClassName="col-md-2" wrapperClassName="col-md-4"
                groupClassName={styles.inline_form_group} {...intakeFormCollectDate} />
                <Input type="text" label="Collected By" labelClassName="col-md-2" wrapperClassName="col-md-4"
                groupClassName={styles.inline_form_group} {...intakeFormCollectedBy} />
              </div>
            </fieldset>
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
