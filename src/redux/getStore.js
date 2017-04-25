import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';

import grid from './grid';
import selectedPoint from './selectedPoint';

let store;

export default function getStore() {
  if (!store) {
    store = createStore(
      combineReducers({
        grid,
        selectedPoint,
      }),
      applyMiddleware(createLogger({
        collapsed: true,
        stateTransformer: (state) => {
          let newState = {};

          for (var i of Object.keys(state)) {
            if (Immutable.Iterable.isIterable(state[i])) {
              newState[i] = state[i].toJS();
            } else if (i === 'grid') {
              // TODO could make this more generic
              newState[i] = {
                ...state[i],
                heights: state[i].heights.toJS(),
              };
            } else {
              newState[i] = state[i];
            }
          };

          return newState;
        }
      }))
    );
  }
  return store;
}
