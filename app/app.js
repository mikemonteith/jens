import React from 'react';
import { connect } from 'react-redux';

import ContextSwitcher from './containers/ContextSwitcher';
import * as ContextSwitcherConsts from './containers/ContextSwitcher/constants';

import TaskWindow from './containers/TaskWindow';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div id="header">
          <ContextSwitcher/>
        </div>
        <div id="main-body">
          {this.props.tab === ContextSwitcherConsts.TASKS && <TaskWindow/>}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    tab: state.contextSwitcher.tab,
  })
)(App)
