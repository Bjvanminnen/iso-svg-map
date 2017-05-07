import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import combineReducersUndoable from './combineReducersUndoable';

import grid, { CREATE_GRID } from './grid';
import selectedPoints from './selectedPoints';
import debugInfo, { SET_DEBUG_TEXT} from './debugInfo';

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
      combineReducersUndoable({
        grid,
        selectedPoints,
        debugInfo,
      }),
      applyMiddleware(
        saveLocalStorage,
        createLogger({
          collapsed: true,
          predicate: (getState, action) => action.type !== SET_DEBUG_TEXT,
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
