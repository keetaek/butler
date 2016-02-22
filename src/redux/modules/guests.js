const LOAD_ALL = 'butler/guests/LOAD_ALL';
const LOAD_ALL_SUCCESS = 'butler/guests/LOAD_ALL_SUCCESS';
const LOAD_ALL_FAIL = 'butler/guests/LOAD_ALL_FAIL';

const CREATE = 'butler/guests/CREATE';
const CREATE_SUCCESS = 'butler/guests/CREATE_SUCCESS';
const CREATE_FAIL = 'butler/guests/CREATE_FAIL';

const CLEAR_NEW_GUEST = 'butler/guests/CLEAR_NEW_GUEST';

const SEARCH = 'butler/guests/SEARCH';
import lo from 'lodash';

const initialState = {
  loaded: false,
  data: null,
  filteredData: null,
  error: null,
  searchTerm: null,
  newGuest: null
};


/**
 * Filtered the full guest list based on the searchTerm
 * @param  {[String]} searchTerm [description]
 * @param  {[Array]} data       optional field. If it doesn't exist, we will use the current prop
 * @return {[type]}            [description]
 */
function searchHelper(searchTerm, guestFullList) {
  const regex = new RegExp(searchTerm, 'gi');
  if (!lo.isEmpty(guestFullList)) {
    return lo.filter(guestFullList, (guest) => {
      if (!lo.isEmpty(guest.first_name) && guest.first_name.match(regex) ||
          !lo.isEmpty(guest.last_name) && guest.last_name.match(regex) ||
          !lo.isEmpty(guest.nickname) && guest.nickname.match(regex)) {
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
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        // Freshly loaded data.
        filteredData: action.result,
        error: null
      };
    case LOAD_ALL_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case CREATE_SUCCESS:
      // Just add a newly added item to the list.
      const updatedList = lo.concat(state.data, action.result);
      console.log('CREATE SUCCESS');
      return {
        ...state,
        loading: false,
        loaded: true,
        // Just adding the newly added item
        data: updatedList,
        filteredData: updatedList,
        showModal: false,
        newGuest: action.result
      };
    case CREATE_FAIL:
      console.log('CREATE FAIL');
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        filteredData: null,
        showModal: false,
        error: action.error,
        newGuest: null
      };
    case SEARCH:
      return {
        ...state,
        // when the data is just loaded filteredData will bi
        filteredData: searchHelper(action.searchTerm, state.data),
        searchTerm: action.searchTerm
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.guests && globalState.guests.loaded;
}

export function loadAll() {
  return {
    types: [LOAD_ALL, LOAD_ALL_SUCCESS, LOAD_ALL_FAIL],
    promise: (client) => client.get('/mockGuests') // params not used, just shown as demonstration
  };
}

export function searchRequest(searchTerm) {
  return { type: SEARCH, searchTerm };
}

export function addNewGuest(firstName, lastName, nickname, birthdate, gender, emergencyContactName, emergencyContactPhone, identificationType, identificationValue, identificationNeedBy, identificationNote, intakeFormCollectDate, intakeFormCollectedBy) {
  const payload = {
    first_name: firstName,
    last_name: lastName,
    nickname: nickname,
    birthdate: birthdate,
    gender: gender,
    emergency_contact_name: emergencyContactName,
    emergency_contact_phone: identificationNeedBy,
    identification_type: identificationType,
    identification_value: identificationValue,
    identification_need_by: identificationNeedBy,
    identification_note: identificationNote,
    intake_form_collect_date: intakeFormCollectDate,
    intake_form_collected_by: intakeFormCollectedBy
  };
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/guests', {
      data: payload
    }) // params not used, just shown as demonstration
  };
}

export function clearNewGuest() {
  return { type: CLEAR_NEW_GUEST };
}
