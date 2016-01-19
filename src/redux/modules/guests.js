const LOAD_ALL = 'butler/guests/LOAD_ALL';
const LOAD_ALL_SUCCESS = 'butler/guests/LOAD_ALL_SUCCESS';
const LOAD_ALL_FAIL = 'butler/guests/LOAD_ALL_FAIL';
// const LOAD = 'butler/guests/LOAD';
// const LOAD_SUCCESS = 'butler/guests/LOAD_SUCCESS';
// const LOAD_FAIL = 'butler/guests/LOAD_FAIL';

const initialState = {
  loaded: false,
  data: null,
  error: null
};

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
