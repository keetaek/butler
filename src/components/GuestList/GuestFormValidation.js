const moment = require('moment');

const isPhoneNumberValid = input => {
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (input.match(regex)) {
    return true;
  }
  return false;
};

const validate = values => {
  const errors = {};
  // firstName
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 20) {
    errors.firstName = 'Must be 20 characters or less';
  }
  // lastName
  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (values.nickname) {
    if (values.nickname.length > 20) {
      errors.nickname = 'Must be 20 characters or less';
    }
  }

  if (!values.birthdate) {
    errors.birthdate = 'Required';
  } else if (!moment(values.birthdate).isValid()) {
    errors.birthdate = 'Must be mm/dd/yyyy';
  }

  if (values.emergencyContactPhone) {
    if (!isPhoneNumberValid(values.emergencyContactPhone)) {
      errors.emergencyContactPhone = 'Must be XXX-XXX-XXXX or XXXXXXXXXX';
    }
  }

  return errors;
};

module.exports = validate;
