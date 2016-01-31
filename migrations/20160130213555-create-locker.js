'use strict';

module.exports = {
  up: function (migration, DataTypes) {
    return migration.createTable('locker', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      guest_id: {
        allowNull: false,
        references: {
          model: 'guest',
          key: 'id'
        },
        type: DataTypes.INTEGER
      },
      rent_start_date: DataTypes.DATEONLY,
      rent_end_date: DataTypes.DATEONLY,
      locker_number: DataTypes.STRING
    });
  },

  down: function (migration) {
    return migration.dropTable('locker');
  }
};
