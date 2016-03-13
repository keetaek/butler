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
      optional: true,
      isDate: true
    },
    'identification_need_by': {
      optional: true,
      isDate: true
    },
    'intake_form_collect_date': {
      optional: true,
      isDate: true
    }
  });
  const errors = req.validationErrors();
  if (errors) {
    return res.send('There have been validation errors: ' + util.inspect(errors), 400).end();
  }
  return next();
}

module.exports = { validatePayloadCreateGuest };
