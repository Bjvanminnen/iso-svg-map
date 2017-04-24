import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';

import grid from './grid';

let store;

export default function getStore() {
  if (!store) {
    store = createStore(
      combineReducers({
        grid
      }),
      applyMiddleware(createLogger({
        collapsed: true
      }))
    );
  }
  return store;
}
