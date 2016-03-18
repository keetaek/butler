const util = require('util');

function validatePayloadCreateGuest(req, res, next) {
  req.checkBody({
    'first_name': {
      notEmpty: true
    },
    'last_name': {
      notEmpty: true
    }
  });
  const errors = req.validationErrors();
  if (errors) {
    return res.send('There have been validation errors: ' + util.inspect(errors), 400).end();
  }
  return next();
}

module.exports = { validatePayloadCreateGuest };
