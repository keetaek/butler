const models = require('models/index');
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
    queryResult = models.Checkin.findAll({order: 'id'});
  } else {
    queryResult = models.Checkin.findAll({ where: queryCondition, order: 'id' });
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

module.exports = { getCheckins, getCheckin, createCheckin, updateCheckin, deleteCheckin };
