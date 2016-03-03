const express = require('express');
const models = require('../models/index');
const checkContentType = require('../middlewares/checkContentType');
const { isEmpty } = require('lodash');

function checkinQueryBuilder(startDate, endDate, guestId) {
  const condition = {};
  // TODO validate the start and endDate field to make sure
  // 1. startDate < endDate
  // 2. They are both valid fields
  if (startDate && endDate) {
    condition.checkin_date = {
      $between: [startDate, endDate]
    };
  }
  if (guestId) {
    condition.guest_id = guestId;
  }
  return condition;
}

async function getCheckins(startDate, endDate, guestId) {
  const queryCondition = checkinQueryBuilder(startDate, endDate, guestId);
  let queryResult;
  if (isEmpty(queryCondition)) {
    queryResult = models.Checkin.findAll({});
  } else {
    queryResult = models.Checkin.findAll({ where: queryCondition });
  }
  return queryResult;
}

async function getCheckin(req) {
  return models.Checkin.find({
    where: {
      id: req.params.id
    }
  });
}

async function createCheckin(req) {
  return models.Checkin.create({
    ...req.body
  });
}

async function updateCheckin(req) {
  return models.Checkin.find({
    where: {
      id: req.params.id
    }
  }).then((checkin) => {
    if (checkin) {
      return checkin.updateAttributes({
        ...req.body
      });
    }
  });
}

function deleteCheckin(req) {
  models.Checkin.destroy({
    where: {
      id: req.params.id
    }
  });
}


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
