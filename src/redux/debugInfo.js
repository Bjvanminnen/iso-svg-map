import { HYDRATE } from './hydration';

export const SET_DEBUG_TEXT = 'debugInfo/SET_DEBUG_TEXT';
export const setDebugText = text => ({ type: SET_DEBUG_TEXT, text });

export const setDebugObj = obj => {
  return setDebugText(JSON.stringify(obj, null, 2));
};

const initialState = {
  text: ' '
};

export default function debugInfo(state=initialState, action) {
  if (action.type === HYDRATE) {
    return action.state.debugInfo;
  }

  if (action.type === SET_DEBUG_TEXT) {
    return {
      ...state,
      text: action.text
    };
  }

  return state;
}
