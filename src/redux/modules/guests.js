const { mapIncomingGuests, mapIncomingGuest, createdIdBasedData } =
require('helpers/guestDataMapper');
const { reduce, isEmpty, filter, concat } = require('lodash');

const LOAD_ALL = 'butler/guests/LOAD_ALL';
const LOAD_ALL_SUCCESS = 'butler/guests/LOAD_ALL_SUCCESS';
const LOAD_ALL_FAIL = 'butler/guests/LOAD_ALL_FAIL';

const LOAD = 'butler/guests/LOAD';
const LOAD_SUCCESS = 'butler/guests/LOAD_SUCCESS';
const LOAD_FAIL = 'butler/guests/LOAD_FAIL';

const CREATE = 'butler/guests/CREATE';
export const CREATE_SUCCESS = 'butler/guests/CREATE_SUCCESS';
const CREATE_FAIL = 'butler/guests/CREATE_FAIL';

const UPDATE = 'butler/guests/UPDATE';
const UPDATE_SUCCESS = 'butler/guests/UPDATE_SUCCESS';
const UPDATE_FAIL = 'butler/guests/UPDATE_FAIL';

const CLEAR_NOTIFICATION = 'butler/guests/CLEAR_NOTIFICATION';

const SEARCH = 'butler/guests/SEARCH';


const initialState = {
  loaded: false,
  loading: false,
  data: null,
  filteredData: null,
  idBasedData: null, // created to search by id.
  error: null,
  searchTerm: null,
  selectedGuest: null,
  selectedGuestLoading: false,
  selectedGuestLoaded: false,
  notification: null
};


/**
 * Filtered the full guest list based on the searchTerm
 * @param  {[String]} searchTerm [description]
 * @param  {[Array]} data       optional field. If it doesn't exist, we will use the current prop
 * @return {[type]}            [description]
 */
function searchHelper(searchTerm, guestFullList) {
  const regex = new RegExp(searchTerm, 'gi');
  if (!isEmpty(guestFullList)) {
    return filter(guestFullList, (guest) => {
      if (!isEmpty(guest.first_name) && guest.first_name.match(regex) ||
          !isEmpty(guest.last_name) && guest.last_name.match(regex) ||
          !isEmpty(guest.nickname) && guest.nickname.match(regex)) {
        return true;
      }
    });
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ALL:
      return {
        ...state,
        loading: true
      };
    case LOAD_ALL_SUCCESS:
      const transformedGuests = mapIncomingGuests(action.result);
      const idBasedData = createdIdBasedData(transformedGuests);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: transformedGuests,
        filteredData: transformedGuests,
        idBasedData: idBasedData,
        error: null
      };
    case LOAD_ALL_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        filteredData: null,
        idBasedData: null,
        error: action.error
      };
    // TODO; LOAD IS NOT BEING USED.
    // case LOAD:
    //   return {
    //     ...state,
    //     selectedGuestLoading: true
    //   };
    // case LOAD_SUCCESS:
    //   const transformedGuest = mapIncomingGuest(action.result);
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //     selectedGuest: transformedGuest,
    //     selectedGuestLoading: false,
    //     selectedGuestLoaded: true,
    //     // Freshly loaded data.
    //     error: null
    //   };
    // case LOAD_FAIL:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: false,
    //     selectedGuest: null,
    //     selectedGuestLoading: false,
    //     selectedGuestLoaded: false,
    //     error: action.error
    //   };

    case CREATE_SUCCESS:
      // Just add a newly added item to the list.
      const listWithNewItem = concat(state.data, mapIncomingGuest(action.result));
      console.log('CREATE SUCCESS');
      return {
        ...state,
        loading: false,
        loaded: true,
        // Just adding the newly added item
        data: listWithNewItem,
        filteredData: listWithNewItem,
        idBasedData: createdIdBasedData((idBasedData)),
        showModal: false,
        notification: {
          status: CREATE_SUCCESS,
          notificationMessage: `Guest ${action.result.first_name}? has been added to the system`,
          updatedGuest: action.result
        }
        // newGuest: action.result,
        // notificationMessage: `Would you like to check in ${action.result.first_name}?`,
      };
    case CREATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        filteredData: null,
        idBasedData: null,
        showModal: false,
        error: action.error,
        notification: {
          status: CREATE_FAIL,
          notificationMessage: 'There was a problem adding a guest to the system. Please try again',
        }
      };

    case UPDATE_SUCCESS:
      // Just add a newly added item to the list.
      const updatedItem = action.result;
      const listWithUpdatedItem = reduce(state.data, (result, item) => {
        if (item.id === updatedItem.id) {
          result.push(updatedItem);
        } else {
          result.push(item);
        }
        return result;
      }, []);
      return {
        ...state,
        data: listWithUpdatedItem,
        filteredData: listWithUpdatedItem,
        idBasedData: createdIdBasedData((idBasedData)),
        showModal: false,
        notification: {
          status: UPDATE_SUCCESS,
          notificationMessage: `Guest ${action.result.first_name}? has been updated`,
          updatedGuest: action.result
        }
      };
    case UPDATE_FAIL:
      return {
        ...state,
        showModal: false,
        notification: {
          status: UPDATE_FAIL,
          notificationMessage: 'There was a problem adding a guest to the system. Please try again'
        },
        error: action.error
      };
    case SEARCH:
      return {
        ...state,
        // when the data is just loaded filteredData will bi
        filteredData: searchHelper(action.searchTerm, state.data),
        searchTerm: action.searchTerm
      };
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: null
      };
    default:
      return state;
  }
}


function buildPayload(fields) {
  return {
    first_name: fields.firstName,
    last_name: fields.lastName,
    nickname: fields.nickname,
    birthdate: fields.birthdate,
    gender: fields.gender,
    emergency_contact_name: fields.emergencyContactName,
    emergency_contact_phone: fields.identificationNeedBy,
    identification_type: fields.identificationType,
    identification_value: fields.identificationValue,
    identification_need_by: fields.identificationNeedBy,
    identification_note: fields.identificationNote,
    intake_form_collect_date: fields.intakeFormCollectDate,
    intake_form_collected_by: fields.intakeFormCollectedBy
  };
}

export function isLoaded(globalState) {
  return globalState.guests && globalState.guests.loaded;
}

export function loadAll() {
  return {
    types: [LOAD_ALL, LOAD_ALL_SUCCESS, LOAD_ALL_FAIL],
    promise: (client) => client.get('/guests') // params not used, just shown as demonstration
  };
}

export function load(guestId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/guests/${guestId}`) // params not used, just shown as demonstration
  };
}

export function searchRequest(searchTerm) {
  return { type: SEARCH, searchTerm };
}

export function addNewGuest(fields) {
  const payload = buildPayload(fields);

  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/guests', {
      data: payload
    }) // params not used, just shown as demonstration
  };
}

export function updateGuest(guestId, fields) {
  const payload = buildPayload(fields);

  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.put(`/guests/${guestId}`, {
      data: payload
    }) // params not used, just shown as demonstration
  };
}

export function clearNotification() {
  return { type: CLEAR_NOTIFICATION };
}

export function searchGuestbyId(idBasedData, id) {
  if (!isEmpty(idBasedData)) {
    return idBasedData[id];
  }
  return null;
}
