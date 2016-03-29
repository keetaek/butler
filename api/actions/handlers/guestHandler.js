const models = require('models/index');
const isEmpty = require('lodash').isEmpty;
const moment = require('moment');
const { getCheckins } = require('actions/handlers/checkinHandler');

async function getGuests() {
  return models.Guest.findAll({ order: ['first_name', 'last_name', 'id'] });
}

async function getGuest(req) {
  return models.Guest.find({
    where: {
      id: req.params.id
    }
  });
}

async function getCheckinsForGuest(id) {
  return getCheckins(null, null, id);
}

/**
 * Formatting the phone number consistently before saving it into the database.
 *
 * @param  {[type]} phoneNumber [description]
 * @return {[type]}             [description]
 */
function formatPhoneNumber(phoneNumber) {
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (!phoneNumber || phoneNumber.length === 0) {
    return null;
  }
  const matched = phoneNumber.match(regex);
  // The regex match should return [{input}, {firstMatch}, {secondMatch}, {thirdMatch}]
  if (matched && matched.length < 4) {
    return null;
  }
  return matched[1] + matched[2] + matched[3];
}

function parseDate(dateField) {
  if (isEmpty(dateField)) {
    return null;
  }
  const parsedDate = moment(dateField);
  return parsedDate.isValid() ? parsedDate.toDate() : null;
}

function updateFields(payload) {
  payload.birthdate = parseDate(payload.birthdate);
  payload.identification_need_by = parseDate(payload.identification_need_by);
  payload.intake_form_collect_date = parseDate(payload.intake_form_collect_date);
  payload.emergency_contact_phone = formatPhoneNumber(payload.emergency_contact_phone);
}

async function createGuest(req) {
  const payload = {...req.body};
  updateFields(payload);
  return models.Guest.create({
    ...payload
  });
}

async function updateGuest(req) {
  return models.Guest.find({
    where: {
      id: req.params.id
    }
  }).then((guest) => {
    if (guest) {
      const payload = {...req.body};
      updateFields(payload);
      return guest.updateAttributes({
        ...payload
      });
    }
  });
}

function deleteGuest(req) {
  models.Guest.destroy({
    where: {
      id: req.params.id
    }
  });
}

module.exports = { getGuest, getGuests, getCheckinsForGuest, createGuest, updateGuest, deleteGuest };
