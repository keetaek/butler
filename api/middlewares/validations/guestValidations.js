const util = require('util');

function validatePayloadCreateGuest(req, res, next) {
  console.log('Is it getting called?');
  req.checkBody({
    'first_name': {
      notEmpty: true
    },
    'last_name': {
      notEmpty: true
    },
    'birthdate': {
      isDate: true
    },
  });
  const errors = req.validationErrors();
  if (errors) {
    return res.send('There have been validation errors: ' + util.inspect(errors), 400).end();
  }
  return next();
}

module.exports = { validatePayloadCreateGuest };
