import { HYDRATE } from './hydration';

const SET_COLOR = 'colors/SET_COLOR';
export const setColor = (key, color) => ({ type: SET_COLOR, key, color });

const initialState = {
  west: '#79A337',
  east: '#B5DA7A',
  flat: '#98BC60',
  stroke: '#99b74f',
  minorStroke: '#c6e398',
};

export default function colors(state=initialState, action) {
  if (action.type === HYDRATE) {
    return state;
    // return action.state.colors;
  }

  if (action.type === SET_COLOR) {
    const { key, color } = action;
    if (!state[key]) {
      throw new Error(`unknown key ${key}`);
    }

    return {
      ...state,
      [key]: color
    };
  }

  return state;
}
