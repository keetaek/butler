const express = require('express');
const models = require('../models/index');
const checkContentType = require('middlewares/checkContentType');
const isEmpty = require('lodash').isEmpty;
const moment = require('moment');
const { validatePayloadCreateGuest } = require('middlewares/validations/guestValidations');

async function getGuests() {
  return models.Guest.findAll({order: 'id'});
}

async function getGuest(req) {
  return models.Guest.find({
    where: {
      id: req.params.id
    }
  });
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

module.exports = () => {
/*eslint-disable */
  const router = express.Router();
/*eslint-enable */

  // e.g. api/guests/3
  router.get('/:id', async (req, res, next) => {
    try {
      const data = await getGuest(req);
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  });

  // e.g. api/guests
  router.get('/', async (req, res, next) => {
    try {
      const data = await getGuests();
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', checkContentType, validatePayloadCreateGuest, async (req, res, next) => {
    try {
      const data = await updateGuest(req);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', checkContentType, validatePayloadCreateGuest, async (req, res, next) => {
    try {
      const data = await createGuest(req);
      res.status(201).send(data);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      await deleteGuest(req);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

  return router;
};
