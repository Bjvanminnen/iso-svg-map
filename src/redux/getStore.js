import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';

import grid, { CREATE_GRID } from './grid';
import selectedPoints from './selectedPoints';

let store;

const saveLocalStorage = store => next => action => {
  const result = next(action);
  if (action.type !== CREATE_GRID) {
    localStorage.setItem('savedStore', JSON.stringify(store.getState()));
  }
  return result;
};


export default function getStore() {
  if (!store) {
    store = createStore(
      combineReducers({
        grid,
        selectedPoints,
      }),
      applyMiddleware(
        saveLocalStorage,
        createLogger({
          collapsed: true,
          stateTransformer: (state) => {
            let newState = {};

            for (var i of Object.keys(state)) {
              if (Immutable.Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS();
              // } else if (i === 'grid') {
              //   // TODO could make this more generic
              //   newState[i] = {
              //     ...state[i],
              //     heights: state[i].heights.toJS(),
              //   };
              } else {
                newState[i] = state[i];
              }
            };

            return newState;
          }
        })
      )
    );
  }
  return store;
}
