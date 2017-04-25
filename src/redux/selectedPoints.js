import { createReducer } from './utils';

let reducers = {};

const SELECT_POINT = 'selectedPoints/SELECT_POINT';
export const selectPoint = (x, y) => ({ type: SELECT_POINT, x, y });
reducers[SELECT_POINT] = (state, {x, y}) => [{x, y}];

const ADD_POINT = 'selectedPoints/ADD_POINT';
export const addPoint = (x, y) => ({ type: ADD_POINT, x, y });
reducers[ADD_POINT] = (state, {x, y}) => {
  if (state.some(point => point.x === x && point.y === y)) {
    // TODO - probably want to remove it in this case
    return state;
  }
  return state.concat({x, y});
}

// const CLEAR_POINT = 'selectedPoints/CLEAR_POINT';
// export const clearPoint = () => ({ type: CLEAR_POINT });
// reducers[CLEAR_POINT] = () => [];

export default createReducer([], reducers, 'selectedPoints');
