module.exports = function(sequelize, DataTypes) {
  const Bar = sequelize.define('bar', {
    bar_start_date: DataTypes.DATEONLY,
    bar_end_date: DataTypes.DATEONLY,
    reason: DataTypes.TEXT
  });

  return Bar;
};
