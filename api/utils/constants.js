module.exports = {
  checkin: {
    maxCheckinBeforeIdRequired: 5,
    validation: {
      noIdFound: {
        code: 0,
        reason: `Guest has checked in more than 5 times. Please check ID`,
      }
    }
  }
};
