import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import getStore from './redux/getStore';
import { createGrid } from './redux/grid';
import { hydrate } from './redux/hydration';

// inspiration:
// https://forum.yoyogames.com/index.php?threads/isometric-top-down-engine-with-height-method.716/

const store = getStore();
const savedStore = localStorage.getItem('savedStore');
try {
  const state = JSON.parse(savedStore);
  store.dispatch(hydrate(state));
} catch (err) {
  store.dispatch(createGrid(30, 20));
}

// TODO
// - explore color schemes
// - undo
// - lowering points
// - deselect point
// cant select bottom row?

// TODO - stretch
// - water? other terrain?
// fog of war?

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
