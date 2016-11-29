import * as types from '../constants/ActionTypes';

const initialPlaylistState = {
  isFetching: false,
  items: [],
  futureUrl: false,
  nextUrl: false,
};


function playlist(state = initialPlaylistState, action) {
  switch (action.type) {

    case types.RECEIVE_SONGS:
      return Object.assign({}, state, {
        isFetching: false,
        items: [...state.items, ...action.songs],
        futureUrl: action.futureUrl,
        nextUrl: action.nextUrl,
      });

    case types.REQUEST_SONGS:
      return Object.assign({}, state, {
        isFetching: true,
        nextUrl: null,
      });

    default:
      return state;
  }
}

const initialState = {};

export default function playlists(state = initialState, action) {
  switch (action.type) {

    case types.RECEIVE_SONGS:
      return Object.assign({}, state, {
        [action.playlist]: playlist(state[action.playlist], action),
      });

    case types.REQUEST_SONGS:
      return Object.assign({}, state, {
        [action.playlist]: playlist(state[action.playlist], action),
      });

    default:
      return state;
  }
}
