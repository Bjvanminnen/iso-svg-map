import { HYDRATE } from './hydration';

const SELECT_POINT = 'selectedPoints/SELECT_POINT';
export const selectPoint = (x, y) => ({ type: SELECT_POINT, x, y });

const ADD_POINT = 'selectedPoints/ADD_POINT';
export const addPoint = (x, y) => ({ type: ADD_POINT, x, y });

const CLEAR_SELECTION = 'selectedPoints/CLEAR_SELECTION';
export const clearSelection = () => ({ type: CLEAR_SELECTION });

export default function selectedPoints(state = [], action) {
  if (action.type === HYDRATE) {
    return action.state.selectedPoints;
  }

  if (action.type === SELECT_POINT) {
    const {x, y} = action;
    return [{x, y}];
  }

  if (action.type === ADD_POINT) {
    const {x, y} = action;
    if (state.some(point => point.x === x && point.y === y)) {
      // TODO - probably want to remove it in this case
      return state;
    }
    return state.concat({x, y});
  }

  if (action.type === CLEAR_SELECTION) {
    return [];
  }

  return state;
}
