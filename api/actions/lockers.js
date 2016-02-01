const express = require('express')
const models = require('../models/index');
const checkContentType = require('../middlewares/checkContentType');

async function getLockers() {
  return models.Locker.findAll({});
}

async function getLocker(req) {
  return models.Locker.find({
    where: {
      id: req.params.id
    }
  });
}

async function createLocker(req) {
  return models.Locker.create({
    ...req.body
  });
}

async function updateLocker(req) {
  return models.Locker.find({
    where: {
      id: req.params.id
    }
  }).then((locker) => {
    if (locker) {
      return locker.updateAttributes({
        ...req.body
      });
    }
  });
}

function deleteLocker(req) {
  models.Locker.destroy({
    where: {
      id: req.params.id
    }
  });
}


module.exports = () => {
/*eslint-disable */
  const router = express.Router();
/*eslint-enable */

  // e.g. api/lockers/3
  router.get('/:id', async (req, res, next) => {
    try {
      const data = await getLocker(req);
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  });

  // e.g. api/lockers
  router.get('/', async (req, res, next) => {
    try {
      const data = await getLockers();
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', checkContentType, async (req, res, next) => {
    try {
      const data = await updateLocker(req);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', checkContentType, async (req, res, next) => {
    try {
      const data = await createLocker(req);
      res.status(201).send(data);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      await deleteLocker(req);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

  return router;
};
