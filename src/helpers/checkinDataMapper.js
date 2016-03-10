const { isEmpty } = require('lodash');
const moment = require('moment');
const FEEL_SAFE_DEFAULT_VALUE = true;
const HEALTH_ISSUE_DEFAULT_VALUE = false;

export function mapIncomingCheckin(data) {
  if (isEmpty(data)) {
    return null;
  }
  return {
    id: data.id,
    guestId: data.guest_id,
    feelSafe: data.feel_safe,
    healthIssue: data.health_issue,
    checkinDate: moment(data.checkin_date).format('YYYY-MM-DD'),
    reportedItems: data.reported_items,
    note: data.note
  };
}

export function mapIncomingCheckins(rawData) {
  if (isEmpty(rawData)) {
    return [];
  }
  return rawData.map(mapIncomingCheckin);
}

export function buildCheckinPayLoad(data) {
  if (isEmpty(data)) {
    return null;
  }
  const checkinDate = data.checkinDate || moment();
  return {
    'guest_id': data.guestId,
    'feel_safe': data.feelSafe || FEEL_SAFE_DEFAULT_VALUE,
    'health_issue': data.healthIssue || HEALTH_ISSUE_DEFAULT_VALUE,
    'checkin_date': moment(checkinDate).format('YYYY-MM-DD'),
    'reported_items': data.reportedItems || '',
    'note': data.note || ''
  };
}
