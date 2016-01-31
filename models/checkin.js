module.exports = function(sequelize, DataTypes) {
  const Checkin = sequelize.define('checkin', {
    checkin_date: DataTypes.DATEONLY,
    feel_safe: DataTypes.BOOLEAN,
    heatlh_issue: DataTypes.BOOLEAN,
    reported_items: DataTypes.TEXT,
    note: DataTypes.TEXT
  });

  return Checkin;
};
