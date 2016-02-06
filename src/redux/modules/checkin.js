const CHECKIN = 'butler/checkin/CREATE';
const CHECKIN_SUCCESS = 'butler/checkin/CREATE_SUCCESS';
const CHECKIN_FAIL = 'butler/checkin/CREATE_FAIL';
const LOAD_DATE = 'butler/checkin/LOAD_DATE';
const LOAD_DATE_SUCCESS = 'butler/checkin/LOAD_DATE_SUCCESS';
const LOAD_DATE_FAIL = 'butler/checkin/LOAD_DATE_FAIL';
// const LOAD_GUEST_HISTORY = 'butler/checkin/LOAD_GUEST_HISTORY';
// const LOAD_GUEST_HISTORY_SUCCESS = 'butler/checkin/LOAD_GUEST_HISTORY_SUCCESS';
// const LOAD_GUEST_HISTORY_FAIL = 'butler/checkin/LOAD_GUEST_HISTORY_FAIL';
// const UPDATE = 'butler/checkin/UPDATE';
// const UPDATE_SUCCESS = 'butler/checkin/UPDATE_SUCCESS';
// const UPDATE_FAIL = 'butler/checkin/UPDATE_FAIL';
// const DELETE = 'butler/checkin/DELETE';
// const DELETE_SUCCESS = 'butler/checkin/DELETE_SUCCESS';
// const DELETE_FAIL = 'butler/checkin/DELETE_FAIL';
const FEEL_SAFE_DEFAULT_VALUE = true;
const HEALTH_ISSUE_DEFAULT_VALUE = false;

const initialState = {
  loaded: false,
  editing: {},
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECKIN:
      return {

      };
    case CHECKIN_SUCCESS:
      return {

      };
    case CHECKIN_FAIL:
      return {

      };
    case LOAD_DATE:
      return {

      };
    case LOAD_DATE_SUCCESS:
      return {

      };
    case LOAD_DATE_FAIL:
      return {

      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.widgets && globalState.widgets.loaded;
}

export function checkin(guestId, feelSafe, healthIssue, date, reportedItems, note) {
  const payload = {
    'guest_id': guestId,
    'feel_safe': feelSafe || FEEL_SAFE_DEFAULT_VALUE,
    'health_issue': healthIssue || HEALTH_ISSUE_DEFAULT_VALUE,
    'checkin_date': date || new Date(),
    'reported_items': reportedItems || '',
    'note': note || ''
  };
  return {
    types: [CHECKIN, CHECKIN_SUCCESS, CHECKIN_FAIL],
    promise: (client) => client.post('/checkins', {
      data: payload
    }) // params not used, just shown as demonstration
  };
}

// function removeCheckin(guest) {
//
// }
//
// function updateCheckin(guest) {
//
// }
//
// function loadCheckins(date) {
//
// }
//
// function loadCheckins(guest) {
//
// }
