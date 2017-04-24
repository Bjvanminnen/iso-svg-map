import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';

let store;

function foo(state = {}, action) {
  return state;
}

export default function getStore() {
  if (!store) {
    store = createStore(
      combineReducers({
        foo
      }),
      applyMiddleware(createLogger({
        collapsed: true
      }))
    );
  }
  return store;
}
