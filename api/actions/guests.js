const express = require('express');
const checkContentType = require('middlewares/checkContentType');
const { validatePayloadCreateGuest } = require('middlewares/validations/guestValidations');
const { getGuest, getGuests, getCheckinsForGuest, createGuest, updateGuest, deleteGuest } = require('actions/handlers/guestHandler');

module.exports = () => {
/*eslint-disable */
  const router = express.Router();
/*eslint-enable */

  // e.g. api/guests/3
  router.get('/:id', async (req, res, next) => {
    try {
      const guestId = req.params.id;
      const data = await getGuest(guestId);
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

  // e.g. api/guests/3/checkins
  router.get('/:id/checkins', async (req, res, next) => {
    try {
      const guestId = req.params.id;
      const data = await getCheckinsForGuest(guestId);
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  });

  return router;
};
