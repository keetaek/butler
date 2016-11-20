module.exports = {
  up: function (migration, DataTypes) {
    return migration.createTable('Guests', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      nickname: DataTypes.STRING,
      birthdate: DataTypes.DATEONLY,
      gender: DataTypes.STRING,
      gender_note: DataTypes.STRING,
      emergency_contact_name: DataTypes.STRING,
      emergency_contact_phone: DataTypes.STRING,
      identification_type: DataTypes.STRING,
      identification_value: DataTypes.STRING,
      identification_need_by: DataTypes.DATEONLY,
      identification_note: DataTypes.TEXT,
      intake_form_collect_date: DataTypes.DATEONLY,
      intake_form_collected_by: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
  },

  down: function (migration) {
    return migration.dropTable('Guests');
  }
};
