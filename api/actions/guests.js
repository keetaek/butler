const express = require('express');
const models = require('../models/index');
const checkContentType = require('../middlewares/checkContentType');
const isEmpty = require('lodash').isEmpty;
const moment = require('moment');
const util = require('util');

async function getGuests() {
  return models.Guest.findAll({});
}

async function getGuest(req) {
  return models.Guest.find({
    where: {
      id: req.params.id
    }
  });
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

  router.put('/:id', checkContentType, async (req, res, next) => {
    try {
      const data = await updateGuest(req);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', (req, res, next) => {
    req.checkBody({
      'first_name': {
        notEmpty: true
      },
      'last_name': {
        notEmpty: true
      },
      'birthdate': {
        optional: true,
        isDate: true
      },
      'identification_need_by': {
        optional: true,
        isDate: true
      },
      'intake_form_collect_date': {
        optional: true,
        isDate: true
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      res.send('There have been validation errors: ' + util.inspect(errors), 400);
      return;
    }
    next();
  }, async (req, res, next) => {
    try {
      await createGuest(req);
      const data = await getGuests();
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
