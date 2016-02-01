module.exports = {
  up: function (migration, DataTypes) {
    return migration.createTable('Bars', {
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
      bar_start_date: DataTypes.DATEONLY,
      bar_end_date: DataTypes.DATEONLY,
      reason: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
  },

  down: function (migration) {
    return migration.dropTable('Bars');
  }
};
