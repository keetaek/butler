module.exports = {
  up: function (migration, DataTypes) {
    return migration.createTable('Checkins', {
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
      checkin_date: DataTypes.DATEONLY,
      feel_safe: DataTypes.BOOLEAN,
      health_issue: DataTypes.BOOLEAN,
      reported_items: DataTypes.TEXT,
      note: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
  },

  down: function (migration) {
    return migration.dropTable('Checkins');
  }
};
