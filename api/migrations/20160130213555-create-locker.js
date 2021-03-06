module.exports = {
  up: function (migration, DataTypes) {
    return migration.createTable('Lockers', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      guest_id: {
        allowNull: false,
        references: {
          model: 'Guests',
          key: 'id'
        },
        type: DataTypes.INTEGER
      },
      rent_start_date: DataTypes.DATEONLY,
      rent_end_date: DataTypes.DATEONLY,
      locker_number: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
  },

  down: function (migration) {
    return migration.dropTable('Lockers');
  }
};
