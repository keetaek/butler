const RESET = 'butler/checkin/RESET';
const CHECKIN = 'butler/checkin/CHECKIN';
const CHECKIN_SUCCESS = 'butler/checkin/CHECKIN_SUCCESS';
export const CHECKIN_FAIL = 'butler/checkin/CHECKIN_FAIL';
const LOAD_CHECKINS = 'butler/checkin/LOAD_CHECKINS';
const LOAD_CHECKINS_SUCCESS = 'butler/checkin/LOAD_CHECKINS_SUCCESS';
export const LOAD_CHECKINS_FAIL = 'butler/checkin/LOAD_CHECKINS_FAIL';
const START_CHECKIN = 'butler/checkin/START_CHECKIN';
const START_CHECKIN_SUCCESS = 'butler/checkin/START_CHECKIN_SUCCESS';
export const START_CHECKIN_FAIL = 'butler/checkin/START_CHECKIN_FAIL';
const FINISH_CHECKIN = 'butler/checkin/FINISH_CHECKIN';
const DELETE_CHECKIN = 'butler/checkin/DELETE_CHECKIN';
const DELETE_CHECKIN_SUCCESS = 'butler/checkin/DELETE_CHECKIN_SUCCESS';
export const DELETE_CHECKIN_FAIL = 'butler/checkin/DELETE_CHECKIN_FAIL';
const CLEAR_NOTIFICATION = 'butler/checkin/CLEAR_NOTIFICATION';
// const LOAD_GUEST_HISTORY = 'butler/checkin/LOAD_GUEST_HISTORY';
// const LOAD_GUEST_HISTORY_SUCCESS = 'butler/checkin/LOAD_GUEST_HISTORY_SUCCESS';
// const LOAD_GUEST_HISTORY_FAIL = 'butler/checkin/LOAD_GUEST_HISTORY_FAIL';
const moment = require('moment');
const { buildCheckinPayLoad, mapIncomingCheckins, mapIncomingCheckin } =
require('helpers/checkinDataMapper');
const { isEmpty, filter, find } = require('lodash');

const initialState = {
  loading: false,
  loaded: false,
  submitting: false,
  showCheckinModal: false,
  selectedGuest: null,
  notification: null,
  checkins: null
};

function addNewCheckin(newCheckin, list) {
  const updatedList = list || [];
  if (!newCheckin) {
    return updatedList;
  }

  const mappedData = mapIncomingCheckin(newCheckin);
  updatedList.push(mappedData);
  return updatedList;
}

function removeCheckinFromList(checkinId, checkinList) {
  if (isEmpty(checkinList) || !checkinId) {
    return checkinList;
  }
  return filter(checkinList, (item) => {
    return item.id !== checkinId;
  });
}

export default function reducer(state = initialState, action = {}) {
  const guest = action.guest;
  switch (action.type) {
    case CHECKIN:
      return {
        ...state,
        submitting: true
      };
    case CHECKIN_SUCCESS:
      return {
        ...state,
        showCheckinModal: false,
        submitting: false,
        checkins: addNewCheckin(action.result, state.checkins),
        notification: {
          status: CHECKIN_SUCCESS,
          data: action.guestId
        }
      };
    case CHECKIN_FAIL:
      return {
        ...state,
        showCheckinModal: false,
        submitting: false,
        notification: {
          status: CHECKIN_FAIL,
          data: action.error
        }
      };
    case START_CHECKIN_SUCCESS:
      return {
        ...state,
        selectedGuest: guest,
        showCheckinModal: true,
      };
    case START_CHECKIN_FAIL:
      return {
        ...state,
        selectedGuest: guest,
        showCheckinModal: true,
        notification: {
          status: START_CHECKIN_FAIL,
          data: action.error
        }
      };
    case FINISH_CHECKIN:
      return {
        ...state,
        selectedGuest: null,
        showCheckinModal: false,
      };

    case DELETE_CHECKIN_SUCCESS:
      const checkinId = action.checkinId;
      const updatedCheckinList = removeCheckinFromList(checkinId, state.checkins);
      return {
        ...state,
        // NOTE: submitting is not set here because we care less about the result
        // We won't show any loading spinner for the delete action
        checkins: updatedCheckinList
      };
    case DELETE_CHECKIN_FAIL:
      return {
        ...state,
        notification: {
          status: DELETE_CHECKIN_FAIL,
          data: action.error
        }
      };
    case LOAD_CHECKINS:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case LOAD_CHECKINS_SUCCESS:
      const transformedData = mapIncomingCheckins(action.result);
      return {
        ...state,
        loading: false,
        loaded: true,
        checkins: transformedData
      };
    case LOAD_CHECKINS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        notification: {
          status: LOAD_CHECKINS_FAIL,
          data: action.error
        }
      };
    case RESET:
      return initialState;
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: null
      };
    default:
      return state;
  }
}

export function checkinGuest(fields) {
  const payload = buildCheckinPayLoad(fields);
  return {
    types: [CHECKIN, CHECKIN_SUCCESS, CHECKIN_FAIL],
    promise: (client) => client.post('/checkins', {
      data: payload,
      guestId: fields.guestId
    })
  };
}

export function startCheckin(guest) {
  return {
    types: [START_CHECKIN, START_CHECKIN_SUCCESS, START_CHECKIN_FAIL],
    promise: (client) => client.get('/checkins/validate', { params: { guestId: guest.id }}),
    guest
  };

  // return { type: START_CHECKIN, guest };
}

export function finishCheckin() {
  return { type: FINISH_CHECKIN };
}

export function deleteCheckin(checkinId) {
  if (!checkinId) {
    return { type: DELETE_CHECKIN_FAIL, error: "Guest wasn't provided" };
  }
  return {
    types: [DELETE_CHECKIN, DELETE_CHECKIN_SUCCESS, DELETE_CHECKIN_FAIL],
    promise: (client) => client.del(`/checkins/${checkinId}`),
    checkinId
  };
}

export function clearNotification() {
  return { type: CLEAR_NOTIFICATION };
}

/**
 * Load checkins for the given date.
 * @param  {[Date]} date
 */
export function loadCheckins(start, end) {
  const startDate = moment(start).format('YYYY-MM-DD');
  let endDate = startDate;
  if (end) {
    endDate = moment(end).format('YYYY-MM-DD');
  }
  return {
    types: [LOAD_CHECKINS, LOAD_CHECKINS_SUCCESS, LOAD_CHECKINS_FAIL],
    promise: (client) => client.get('/checkins', { params: { startDate: startDate, endDate: endDate } })
  };
}

export function isGuestAlreadyCheckedIn(guestId, checkinList) {
  if (!checkinList || isEmpty(checkinList)) {
    return false;
  }
  const checkin = find(checkinList, (item) => {
    return item.guestId === guestId;
  });
  if (checkin) {
    return true;
  }
  return false;
}
