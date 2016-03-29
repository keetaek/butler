const express = require('express');
const checkContentType = require('../middlewares/checkContentType');
const { getCheckins, getCheckin, createCheckin, updateCheckin, deleteCheckin } = require('actions/handlers/checkinHandler');

module.exports = () => {
/*eslint-disable */
  const router = express.Router();
/*eslint-enable */

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
