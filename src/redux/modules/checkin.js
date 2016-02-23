const CHECKIN = 'butler/checkin/CREATE';
const CHECKIN_SUCCESS = 'butler/checkin/CHECKIN_SUCCESS';
const CHECKIN_FAIL = 'butler/checkin/CREATE_FAIL';
const LOAD_DATE = 'butler/checkin/LOAD_DATE';
const LOAD_DATE_SUCCESS = 'butler/checkin/LOAD_DATE_SUCCESS';
const LOAD_DATE_FAIL = 'butler/checkin/LOAD_DATE_FAIL';
const START_CHECKIN = 'butler/checkin/START_CHECKIN';
const FINISH_CHECKIN = 'butler/checkin/FINISH_CHECKIN';
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
  showCheckinModal: false,
  showGuestModal: false,
  checkinDate: new Date(),
  updateGuest: false
  // editing: {},
  // saveError: {},
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
    case START_CHECKIN:
      const guestId = action.guestId;
      return {
        ...state,
        selectedGuestId: guestId,
        showCheckinModal: true,
        showGuestModal: false,
      };
    case FINISH_CHECKIN:
      return {
        ...state,
        selectedGuestId: null,
        updateGuest: false,
        showCheckinModal: false
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


export function checkinGuest(guestId, feelSafe, healthIssue, date, reportedItems, note) {
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

export function startCheckin(guestId) {
  return { type: START_CHECKIN, guestId };
}

export function finishCheckin() {
  return { type: FINISH_CHECKIN };
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
