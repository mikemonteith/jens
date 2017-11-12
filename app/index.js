
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { remote } from 'electron';

import store from './store';
import App from './app.js';
import NewProject from './containers/NewProject'

require('./index.css');


const Window = () => {
    const JENS_WINDOW_ID = remote.getCurrentWindow().JENS_WINDOW_ID

    if (JENS_WINDOW_ID === 'new-project') {
        return <NewProject />
    } else if (JENS_WINDOW_ID === 'app') {
        return <App />
    } else {
        throw new Error(`invalid JENS_WINDOW_ID variable: ${JENS_WINDOW_ID} not found`)
    }
}

ReactDOM.render(
  <Provider store={store}>
    <Window/>
  </Provider>,
  document.getElementById('react-root')
);
