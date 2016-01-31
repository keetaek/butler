module.exports = function(sequelize, DataTypes) {
  const Locker = sequelize.define('locker', {
    rent_start_date: DataTypes.DATEONLY,
    rent_end_date: DataTypes.DATEONLY,
    locker_number: DataTypes.STRING
  });

  return Locker;
};
