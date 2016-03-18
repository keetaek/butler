const Faker = require('faker');

function createFakeData(numData) {
  const guests = [];
  for (var index = 0; index < numData; index++) {
    guests.push({
      first_name: Faker.name.firstName(),
      last_name: Faker.name.lastName(),
      nickname: Faker.name.firstName(),
      birthdate: Faker.date.past(50, new Date('Sat Sep 20 1999 21:35:02 GMT+0200 (CEST)')),
      gender: Faker.random.arrayElement(['male', 'female', 'mtf', 'ftm', 'other']),
      emergency_contact_name: Faker.name.findName(),
      emergency_contact_phone: Faker.phone.phoneNumber('###-###-####'),
      identification_type: 'state',
      identification_value: Faker.random.number(100000000),
      identification_need_by: Faker.date.recent(),
      identification_note: Faker.lorem.sentences(),
      intake_form_collect_date: Faker.date.recent(),
      intake_form_collected_by: Faker.name.findName()
    });
  }
  return guests;
}

module.exports = {
  up: function (queryInterface, Sequelize) {
    const mockData = createFakeData(50);

    return queryInterface.bulkInsert('Guests', mockData, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Guests', null, {});
  }
};
