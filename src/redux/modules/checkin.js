const RESET = 'butler/checkin/RESET';
const CHECKIN = 'butler/checkin/CHECKIN';
const CHECKIN_SUCCESS = 'butler/checkin/CHECKIN_SUCCESS';
const CHECKIN_FAIL = 'butler/checkin/CHECKIN_FAIL';
const LOAD_DATE = 'butler/checkin/LOAD_DATE';
const LOAD_DATE_SUCCESS = 'butler/checkin/LOAD_DATE_SUCCESS';
const LOAD_DATE_FAIL = 'butler/checkin/LOAD_DATE_FAIL';
const START_CHECKIN = 'butler/checkin/START_CHECKIN';
const CANCEL_CHECKIN = 'butler/checkin/CANCEL_CHECKIN';
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
  updateGuest: false,
  selectedGuestId: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECKIN_SUCCESS:
    // After successful checkin, check to see if we need to update a user
      const updateGuest = action.updateGuest;
      let selectedGuestId = null;
      let showGuestModal = false;
      if (updateGuest) {
        selectedGuestId = state.selectedGuestId;
        showGuestModal = true;
      }
      return {
        ...state,
        selectedGuestId: selectedGuestId,
        updateGuest: updateGuest,
        showCheckinModal: false,
        showGuestModal: showGuestModal
      };
    case CHECKIN_FAIL:
      return {
        selectedGuestId: null,
        updateGuest: false,
        showCheckinModal: false,
        showGuestModal: false,
        // showSnackBar: true
      };
    case START_CHECKIN:
      const guestId = action.guestId;
      return {
        ...state,
        selectedGuestId: guestId,
        showCheckinModal: true,
        showGuestModal: false,
      };
    case CANCEL_CHECKIN:
      return {
        ...state,
        selectedGuestId: null,
        updateGuest: false,
        showCheckinModal: false,
        showGuestModal: false
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


export function checkinGuest(guestId, feelSafe, healthIssue, date, reportedItems, note, updateGuest) {
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
    }), // params not used, just shown as demonstration
    updateGuest
  };
}

export function startCheckin(guestId) {
  return { type: START_CHECKIN, guestId };
}

export function cancelCheckin() {
  return { type: CANCEL_CHECKIN };
}

/**
 * Why is this method here and not in Guest Module?
 * Because the module display occurs in the checkin.
 *
 * @return {[type]} [description]
 */
export function cancelGuestUpdate() {
  return { type: RESET };
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
