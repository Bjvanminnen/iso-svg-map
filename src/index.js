import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import getStore from './redux/getStore';
import { createGrid, raisePoint } from './redux/grid';

const store = getStore();
store.dispatch(createGrid(10, 10));
store.dispatch(raisePoint(3, 3));
store.dispatch(raisePoint(3, 3));

setTimeout(() => {
  store.dispatch(raisePoint(3, 4));
  store.dispatch(raisePoint(4, 4));
  store.dispatch(raisePoint(4, 3));
}, 3000);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
