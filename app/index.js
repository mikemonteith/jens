
import querystring from 'querystring'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './app.js'; //TODO: put this into the Workspace container
import NewProject from './containers/NewProject'

require('./index.css');

const params = querystring.parse(global.location.search.substring(1))
const { windowType } = params
//TODO: this windowType query param should come from state instead.

const Window = () => {
    if (windowType === 'new-project') {
        return <NewProject />
    } else if (windowType === 'app') {
        return <App />
    } else {
        throw new Error(`invalid windowType variable: ${windowType} not found`)
    }
}

ReactDOM.render(
  <Provider store={store}>
      <Window/>
  </Provider>,
  document.getElementById('react-root')
);
