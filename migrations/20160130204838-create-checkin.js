module.exports = {
  up: function (migration, DataTypes) {
    return migration.createTable('checkin', {
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
      checkin_date: DataTypes.DATEONLY,
      feel_safe: DataTypes.BOOLEAN,
      heatlh_issue: DataTypes.BOOLEAN,
      reported_items: DataTypes.TEXT,
      note: DataTypes.TEXT
    });
  },

  down: function (migration) {
    return migration.dropTable('checkin');
  }
};
