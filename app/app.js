import React from 'react';

import ContextSwitcher from './containers/ContextSwitcher';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div id="header">
          <ContextSwitcher/>
        </div>
        <div id="main-body"/>
      </div>
    );
  }
}
