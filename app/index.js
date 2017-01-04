
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './app.js';

require('./index.css');

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('react-root')
);
