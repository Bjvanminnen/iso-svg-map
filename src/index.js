import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import getStore from './redux/getStore';
import { createGrid } from './redux/grid';

const store = getStore();
store.dispatch(createGrid(10, 10));


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
