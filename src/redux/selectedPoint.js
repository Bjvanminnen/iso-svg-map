import { createReducer } from './utils';

let reducers = {};

const SELECT_POINT = 'selectedPoint/SELECT_POINT';
export const selectPoint = (x, y) => ({ type: SELECT_POINT, x, y });
reducers[SELECT_POINT] = (state, {x, y}) => ({x, y});

const CLEAR_POINT = 'selectedPoint/CLEAR_POINT';
export const clearPoint = () => ({ type: CLEAR_POINT });
reducers[CLEAR_POINT] = () => null;

export default createReducer(null, reducers, 'selectedPoint');
