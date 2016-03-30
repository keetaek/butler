const express = require('express');
const checkContentType = require('../middlewares/checkContentType');
const { getCheckins, getCheckin, createCheckin, updateCheckin, deleteCheckin, getCheckinCount } = require('actions/handlers/checkinHandler');
const { getGuest } = require('actions/handlers/guestHandler');
const constants = require('utils/constants');

async function validateCheckin(guestId) {
  const checkinCount = await getCheckinCount(guestId);
  const guestInfo = await getGuest(guestId);
  const identification = guestInfo.identification_value;

  if (checkinCount > constants.checkin.maxCheckinBeforeIdRequired &&
  (identification && identification.length > 0 )) {
    return { valid: true };
  }
  return { valid: false, code: constants.checkin.validation.noIdFound.code, reason: constants.checkin.validation.noIdFound.reason };
}

module.exports = () => {
/*eslint-disable */
  const router = express.Router();
/*eslint-enable */

  router.get('/validate', async (req, res, next) => {
    try {
      const guestId = req.query.guestId;
      const data = await validateCheckin(guestId);
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(500).end();
      }
    } catch (err) {
      next(err);
    }
  });

  // e.g. api/checkins/3
  router.get('/:id', async (req, res, next) => {
    try {
      const data = await getCheckin(req);
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  });

  /**
   * Return list of checkins based on the guest or date field
   * @param  {[type]} '/'   [description]
   * @param  {[type]} async (req,         res, next [description]
   * @return {[type]}       [description]
   */
  router.get('/', async (req, res, next) => {
    try {
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      const guestId = req.query.guestId;

      const data = await getCheckins(startDate, endDate, guestId);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });


  router.put('/:id', checkContentType, async (req, res, next) => {
    try {
      const data = await updateCheckin(req);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', checkContentType, async (req, res, next) => {
    try {
      const data = await createCheckin(req);
      res.status(201).send(data);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      await deleteCheckin(req);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

  return router;
};
