module.exports = {
  checkin: {
    maxCheckinBeforeIdRequired: 5,
    validation: {
      noIdFound: {
        code: 0,
        reason: `Guest has checked in more than 5 times. Please check ID`,
      },
      acceptableAge: {
        code: 1,
        min: 18,
        max: 25,
        reason: 'Guest is out of the allowed age range'
      }
    }
  }
};
