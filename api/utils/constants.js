module.exports = {
  checkin: {
    maxCheckinBeforeIdRequired: 5,
    validation: {
      noIdFound: {
        code: 0,
        reason: 'No ID found in the system',
      }
    }
  }
};
