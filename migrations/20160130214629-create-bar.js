module.exports = {
  up: function (migration, DataTypes) {
    return migration.createTable('bar', {
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
      bar_start_date: DataTypes.DATEONLY,
      bar_end_date: DataTypes.DATEONLY,
      reason: DataTypes.TEXT
    });
  },

  down: function (migration) {
    return migration.dropTable('bar');
  }
};
