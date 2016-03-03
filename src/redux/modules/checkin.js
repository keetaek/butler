const RESET = 'butler/checkin/RESET';
const CHECKIN = 'butler/checkin/CHECKIN';
const CHECKIN_SUCCESS = 'butler/checkin/CHECKIN_SUCCESS';
export const CHECKIN_FAIL = 'butler/checkin/CHECKIN_FAIL';
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
  selectedGuest: null,
  notification: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECKIN_SUCCESS:
      return {
        ...state,
        showCheckinModal: false,
        notification: {
          status: CHECKIN_SUCCESS,
          data: action.guestId
        }
      };
    case CHECKIN_FAIL:
      return {
        ...state,
        showCheckinModal: false,
        notification: {
          status: CHECKIN_FAIL,
          data: action.error
        }
      };
    case START_CHECKIN:
      const guest = action.guest;
      return {
        ...state,
        selectedGuest: guest,
        showCheckinModal: true,
      };
    case FINISH_CHECKIN:
      return {
        ...state,
        selectedGuest: null,
        showCheckinModal: false,
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
    case RESET:
      return initialState;
    default:
      return state;
  }
}

function buildPayload(fields) {
  return {
    'guest_id': fields.id,
    'feel_safe': fields.feelSafe || FEEL_SAFE_DEFAULT_VALUE,
    'health_issue': fields.healthIssue || HEALTH_ISSUE_DEFAULT_VALUE,
    'checkin_date': fields.date || new Date(),
    'reported_items': fields.reportedItems || '',
    'note': fields.note || ''
  };
}

export function checkinGuest(fields) {
  const payload = buildPayload(fields);
  return {
    types: [CHECKIN, CHECKIN_SUCCESS, CHECKIN_FAIL],
    promise: (client) => client.post('/checkins', {
      data: payload,
      guestId: fields.id
    })
  };
}

export function startCheckin(guest) {
  return { type: START_CHECKIN, guest };
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
