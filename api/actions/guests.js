const express = require('express')
const models = require('../models/index');
const checkContentType = require('../middlewares/checkContentType');
const RSVP = require('rsvp');

async function getGuests(req) {
  return models.Guest.findAll({});
}

async function getGuest(req) {
  const guestId = req.params.id;
  return models.Guest.find({
    where: {
      id: guestId
    }
  });
}

// TODO:Needs to add validation - here?  or SQL level?
// TODO: Need to do content type check
//
async function createGuest(req) {
  console.log('Req.Body', req.body);
  return models.Guest.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    nickname: req.body.nickname,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
    emergency_contact_name: req.body.emergency_contact_name,
    emergency_contact_phone: req.body.emergency_contact_phone,
    identification_type: req.body.identification_type,
    identification_value: req.body.identification_value,
    identification_need_by: req.body.identification_need_by,
    identification_note: req.body.identification_note,
    intake_form_collect_date: req.body.intake_form_collect_date,
    intake_form_collected_by: req.body.intake_form_collected_by
  });
}

// function updateGuest() {
//
// }
//
// function deleteGuest() {
//
// }


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
      const data = await getGuests(req);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', checkContentType, async (req, res, next) => {
    try {
      const data = await createGuest(req);
      res.status(201).send(data);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
