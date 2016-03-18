const moment = require('moment');
module.exports = function(sequelize, DataTypes) {
  const Guest = sequelize.define('Guest', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    birthdate: {
      type: DataTypes.DATEONLY,
      get: function() {
        if (moment(this.getDataValue('birthdate')).isValid()) {
          return moment.utc(this.getDataValue('birthdate')).format('YYYY-MM-DD');
        }
        return this.getDataValue('birthdate');
      },
    },
    gender: DataTypes.STRING,
    emergency_contact_name: DataTypes.STRING,
    emergency_contact_phone: DataTypes.STRING,
    identification_type: DataTypes.STRING,
    identification_value: DataTypes.STRING,
    identification_need_by: {
      type: DataTypes.DATEONLY,
      get: function() {
        if (moment(this.getDataValue('identification_need_by')).isValid()) {
          return moment.utc(this.getDataValue('identification_need_by')).format('YYYY-MM-DD');
        }
        return this.getDataValue('identification_need_by');
      },
    },
    identification_note: DataTypes.TEXT,
    intake_form_collect_date: {
      type: DataTypes.DATEONLY,
      get: function() {
        if (moment(this.getDataValue('intake_form_collect_date')).isValid()) {
          return moment.utc(this.getDataValue('intake_form_collect_date')).format('YYYY-MM-DD');
        }
        return this.getDataValue('intake_form_collect_date');
      },
    },
    intake_form_collected_by: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Guest.hasMany(models.Checkin, { foreignKey: 'guest_id' });
        Guest.hasMany(models.Locker, { foreignKey: 'guest_id' });
        Guest.hasMany(models.Bar, { foreignKey: 'guest_id' });
      }
    }
  });
  return Guest;
};
