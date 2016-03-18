const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const Checkin = sequelize.define('Checkin', {
    guest_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    checkin_date: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: true
      },
      // Why do we have to do this?
      // getDataValue for Date field will return Date object and assume the date field was in UTC. We need to ensure there aren't any time fields.
      get: function() {
        return moment.utc(this.getDataValue('checkin_date')).format('YYYY-MM-DD');
      }
    },
    feel_safe: DataTypes.BOOLEAN,
    heatlh_issue: DataTypes.BOOLEAN,
    reported_items: DataTypes.TEXT,
    note: DataTypes.TEXT
  });

  return Checkin;
};
