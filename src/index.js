import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import getStore from './redux/getStore';
import { createGrid } from './redux/grid';
import { hydrate } from './redux/utils';

const store = getStore();
const savedStore = localStorage.getItem('savedStore');
try {
  const state = JSON.parse(savedStore);
  store.dispatch(hydrate(state));
} catch (err) {
  store.dispatch(createGrid(10, 10));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
