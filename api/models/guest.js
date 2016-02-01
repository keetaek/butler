module.exports = function(sequelize, DataTypes) {
  const Guest = sequelize.define('Guest', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    emergency_contact_name: DataTypes.STRING,
    emergency_contact_phone: DataTypes.STRING,
    identification_type: DataTypes.STRING,
    identification_value: DataTypes.STRING,
    identification_need_by: DataTypes.DATEONLY,
    identification_note: DataTypes.TEXT,
    intake_form_collect_date: DataTypes.DATEONLY,
    intake_form_collected_by: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Guest.hasMany(models.Checkin);
        Guest.hasMany(models.Locker);
        Guest.hasMany(models.Bar);
      }
    }
  });
  return Guest;
};
