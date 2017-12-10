import React from 'react';
import connect from './connect';

import ContextSwitcher from './containers/ContextSwitcher';
import * as ContextSwitcherConsts from './containers/ContextSwitcher/constants';

import TaskWindow from './containers/TaskWindow';
import GitWindow from './containers/GitWindow';

import Window from './components/Window'

class App extends React.Component {
  render() {
    return (
      <Window expanded padding={0}>
        {this.props.packageData && (
          <span className="project-name">
            Project: {this.props.packageData.name}
          </span>
        )}
        <div id="header">
          <ContextSwitcher/>
        </div>
        <div id="main-body">
          {this.props.tab === ContextSwitcherConsts.TASKS && <TaskWindow/>}
          {this.props.tab === ContextSwitcherConsts.GIT && <GitWindow/>}
        </div>
      </Window>
    );
  }
}

export default connect(
  (state) => ({
    tab: state.contextSwitcher.tab,
    packageData: state.workspace.package,
  })
)(App)
