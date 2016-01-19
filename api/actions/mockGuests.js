const Faker = require('faker');

function createFakeData(numData) {
  const guests = [];
  for (let i = 0 ; i < numData; i++) {
    const item = {
      id: i,
      first_name: Faker.name.firstName(),
      last_name: Faker.name.lastName(),
      nickname: Faker.name.jobTitle(),
      birthdate: Faker.date.past(50, new Date('Sat Sep 20 1999 21:35:02 GMT+0200 (CEST)')),
      gender: 'M',
      emergency_contact_name: Faker.name.findName(),
      emergency_contact_phone: Faker.phone.phoneNumber('###-###-####'),
      identification_type: 'state',
      identification_value: Faker.random.number(100000000),
      identification_need_by: Faker.date.recent(),
      identification_note: Faker.lorem.sentences(),
      intake_form_collect_date: Faker.date.recent(),
      intake_form_collected_by: Faker.name.findName()
    };
    guests.push(item);
  }
  return guests;
}

export default function loadInfo() {
  const guests = createFakeData(5)
  return Promise.resolve(guests);
}
