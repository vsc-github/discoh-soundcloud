import * as types from '../constants/ActionTypes';

function changedToMobile(isMobile) {
  return {
    type: types.CHANGE_IS_MOBILE,
    isMobile,
  };
}

export function changeDimensions(height, width) {
  return {
    type: types.CHANGE_WIDTH_AND_HEIGHT,
    height,
    width,
  };
}

export function initEnvironment() {
  return dispatch => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    dispatch(changedToMobile(isMobile));
    dispatch(changeDimensions(window.innerHeight, window.innerWidth));

    window.onresize = () => {
      dispatch(changeDimensions(window.innerHeight, window.innerWidth));
    };
  };
}
