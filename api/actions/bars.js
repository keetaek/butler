const express = require('express')
const models = require('../models/index');
const checkContentType = require('../middlewares/checkContentType');

async function getBars() {
  return models.Bar.findAll({});
}

async function getBar(req) {
  return models.Bar.find({
    where: {
      id: req.params.id
    }
  });
}

async function createBar(req) {
  return models.Bar.create({
    ...req.body
  });
}

async function updateBar(req) {
  return models.Bar.find({
    where: {
      id: req.params.id
    }
  }).then((bar) => {
    if (bar) {
      return bar.updateAttributes({
        ...req.body
      });
    }
  });
}

function deleteBar(req) {
  models.Bar.destroy({
    where: {
      id: req.params.id
    }
  });
}


module.exports = () => {
/*eslint-disable */
  const router = express.Router();
/*eslint-enable */

  // e.g. api/bars/3
  router.get('/:id', async (req, res, next) => {
    try {
      const data = await getBar(req);
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  });

  // e.g. api/bars
  router.get('/', async (req, res, next) => {
    try {
      const data = await getBars();
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', checkContentType, async (req, res, next) => {
    try {
      const data = await updateBar(req);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', checkContentType, async (req, res, next) => {
    try {
      const data = await createBar(req);
      res.status(201).send(data);
    } catch (err) {
      console.log("ERROR", err);
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      await deleteBar(req);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

  return router;
};
