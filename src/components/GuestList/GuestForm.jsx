import React, { Component, PropTypes } from 'react';
const { reduxForm } = require('redux-form');
const { Input } = require('react-bootstrap');
const validate = require('components/GuestList/GuestFormValidation');
const { isEmpty } = require('lodash');

@reduxForm({
  form: 'guestForm',
  fields: ['firstName', 'lastName', 'nickname', 'birthdate', 'gender', 'genderNote',
            'emergencyContactName', 'emergencyContactPhone', 'identificationType', 'identificationValue',
            'identificationNeedBy', 'identificationNote',
            'intakeFormCollectDate', 'intakeFormCollectedBy'],
  validate,
})
export default class GuestForm extends Component {
  static propTypes = {
    fields: PropTypes.shape({
      firstName: PropTypes.object.isRequired,
      lastName: PropTypes.object.isRequired,
      nickname: PropTypes.object.isRequired,
      birthdate: PropTypes.object.isRequired,
      gender: PropTypes.object.isRequired,
      genderNote: PropTypes.object.isRequired,
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

  styleFieldPerValidation(field) {
    let style;
    if (field.touched) {
      if (field.error) {
        style = 'error';
      } else if (!isEmpty(field.value)) {
        style = 'success';
      }
    }
    return style;
  }

  render() {
    const {fields: { firstName, lastName, nickname, birthdate, gender, genderNote, emergencyContactName, emergencyContactPhone, identificationType, identificationValue, identificationNeedBy, identificationNote, intakeFormCollectDate, intakeFormCollectedBy } } = this.props;
    const styles = require('./GuestForm.scss');
    return (
      <span>
        <form>
          <fieldset>
            <h4>Basic Info</h4>
            <div className="row form-group">
              <Input type="text" bsStyle={this.styleFieldPerValidation(firstName)} placeholder="First Name" label="First Name" labelClassName="col-md-2" wrapperClassName="col-md-4" groupClassName={styles.inline_form_group} help={firstName.touched && firstName.error} {...firstName} />
              <Input type="text" bsStyle={this.styleFieldPerValidation(lastName)} placeholder="Last Name" label="Last Name" labelClassName="col-md-2" wrapperClassName="col-md-4" groupClassName={styles.inline_form_group} help={lastName.touched && lastName.error} {...lastName} />
            </div>
            <div className="row form-group">
              <Input type="text" bsStyle={this.styleFieldPerValidation(nickname)} placeholder="Nickname" label="Nickname" labelClassName="col-md-2" wrapperClassName="col-md-4"
              groupClassName={styles.inline_form_group} help={nickname.touched && nickname.error}
              {...nickname} />
            <Input type="date" bsStyle={this.styleFieldPerValidation(birthdate)} label="Birthdate" labelClassName="col-md-2" wrapperClassName="col-md-4"
              groupClassName={styles.inline_form_group} help={birthdate.touched && birthdate.error}
              {...birthdate} />
            </div>
            <div className="row">
              <label className={'col-md-2 ' + styles.label_margin}
                >Gender</label>
              {/* Radio buttons are treated little differently. It doesn't use the spread operator - https://github.com/erikras/redux-form/issues/124 */}
              <Input label="Male" type="radio" name="gender" onChange={gender.onChange} checked={gender.value === 'male'} value="male" groupClassName="radio-inline {styles.inline_form_group}" />
              <Input label="Female" type="radio" name="gender" onChange={gender.onChange} checked={gender.value === 'female'} value="female" groupClassName="radio-inline" />
              <Input label="MTF" type="radio" name="gender" onChange={gender.onChange} checked={gender.value === 'mtf'} value="mtf" groupClassName="radio-inline" />
              <Input label="FTM" type="radio" name="gender" onChange={gender.onChange} checked={gender.value === 'ftm'} value="ftm" groupClassName="radio-inline" />
              <Input label="Other" type="radio" name="gender" onChange={gender.onChange} checked={gender.value === 'other'} value="other" groupClassName="radio-inline" />
              <Input type="text" bsStyle={this.styleFieldPerValidation(genderNote)} placeholder="Note" label="Others"
              labelClassName="col-md-2" wrapperClassName="col-md-4" {...genderNote} />
            </div>
          </fieldset>
          <fieldset>
            <h4>Emergency Contact</h4>
            <div className="row form-group">
              <Input type="text" bsStyle={this.styleFieldPerValidation(emergencyContactName)} placeholder="name" label="Name"
              labelClassName="col-md-2" wrapperClassName="col-md-4"
              groupClassName={styles.inline_form_group} {...emergencyContactName} />
            <Input type="tel" label="Phone Number" bsStyle={this.styleFieldPerValidation(emergencyContactPhone)} labelClassName="col-md-2" wrapperClassName="col-md-4"
              groupClassName={styles.inline_form_group} help={emergencyContactPhone.touched && emergencyContactPhone.error} {...emergencyContactPhone} />
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
              <Input type="text" label="Identification #" bsStyle={this.styleFieldPerValidation(identificationValue)} labelClassName="col-md-2" wrapperClassName="col-md-4"
              groupClassName={styles.inline_form_group} {...identificationValue} />
            </div>
            <div className="row form-group">
              <Input type="date" label="ID need by" bsStyle={this.styleFieldPerValidation(identificationNeedBy)} labelClassName="col-md-2" wrapperClassName="col-md-4"
              groupClassName={styles.inline_form_group} {...identificationNeedBy} />
              <Input type="text" placeholder="note" label="Note" labelClassName="col-md-2" wrapperClassName="col-md-4"
              groupClassName={styles.inline_form_group} {...identificationNote} />
            </div>
            <div className="row form-group">
              <Input type="date" label="Collection Date" bsStyle={this.styleFieldPerValidation(intakeFormCollectDate)} labelClassName="col-md-2" wrapperClassName="col-md-4"
              groupClassName={styles.inline_form_group} {...intakeFormCollectDate} />
              <Input type="text" label="Collected By" bsStyle={this.styleFieldPerValidation(intakeFormCollectedBy)} labelClassName="col-md-2" wrapperClassName="col-md-4"
              groupClassName={styles.inline_form_group} {...intakeFormCollectedBy} />
            </div>
          </fieldset>
        </form>
      </span>
    );
  }
}

module.exports = GuestForm;
