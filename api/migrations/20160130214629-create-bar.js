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
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    });
  },

  down: function (migration) {
    return migration.dropTable('Bars');
  }
};
