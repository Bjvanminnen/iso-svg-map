import { createReducer } from './utils';

let reducers = {};

const SELECT_POINT = 'selectedPoints/SELECT_POINT';
export const selectPoint = (x, y) => ({ type: SELECT_POINT, x, y });
reducers[SELECT_POINT] = (state, {x, y}) => [{x, y}];

// const CLEAR_POINT = 'selectedPoints/CLEAR_POINT';
// export const clearPoint = () => ({ type: CLEAR_POINT });
// reducers[CLEAR_POINT] = () => [];

export default createReducer([], reducers, 'selectedPoints');
