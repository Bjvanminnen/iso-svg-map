import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import getStore from './redux/getStore';

getStore();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
