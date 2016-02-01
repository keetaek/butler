const express = require('express')
const models = require('../models/index');
const checkContentType = require('../middlewares/checkContentType');

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

async function createGuest(req) {
  return models.Guest.create({
    ...req.body
  });
}

async function updateGuest(req) {
  return models.Guest.find({
    where: {
      id: req.params.id
    }
  }).then((guest) => {
    if (guest) {
      return guest.updateAttributes({
        ...req.body
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

  router.post('/', checkContentType, async (req, res, next) => {
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
