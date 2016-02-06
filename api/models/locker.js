module.exports = function(sequelize, DataTypes) {
  const Locker = sequelize.define('Locker', {
    guest_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    rent_start_date: DataTypes.DATEONLY,
    rent_end_date: DataTypes.DATEONLY,
    locker_number: DataTypes.STRING
  });

  return Locker;
};
