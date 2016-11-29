import * as types from '../constants/ActionTypes';
import { constructUrl, parseUrl } from '../utils/RouteUtils';

export function changePath(route) {
  return {
    type: types.CHANGE_PATH,
    route,
  };
}

export function initNavigator() {
  return dispatch => {

    if (window.location.hash !== '') {
      dispatch(navigateTo(parseUrl(window.location.hash)));
    }
  };
}

export function navigateTo(route, shouldPushState = true) {
  return (dispatch, getState) => {
    const { navigator } = getState();
    if (constructUrl(route) === constructUrl(navigator.route)) {
      return null;
    }

    if (shouldPushState) {
      pushState(route);
    }

    return dispatch(changePath(route));
  };
}

function pushState(route) {
  history.pushState({ route }, '', `#/${constructUrl(route)}`);
}
