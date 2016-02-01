const express = require('express')
const models = require('../models/index');
const checkContentType = require('../middlewares/checkContentType');

async function getCheckins() {
  return models.Checkin.findAll({});
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

  // e.g. api/checkins
  router.get('/', async (req, res, next) => {
    try {
      const data = await getCheckins();
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
