import React from 'react';
import connect from '../../connect';

import ContextSwitcher from '../ContextSwitcher';
import * as ContextSwitcherConsts from '../ContextSwitcher/constants';

import TaskWindow from '../TaskWindow';
import FilesWindow from '../FilesWindow';
import GitWindow from '../GitWindow';

import Window from '../../components/Window'

class App extends React.Component {
  _renderNoPackageError() {
    return (
      <Window expanded padding={0}>
        <div>{this.props.packageReadError.message}</div>
        <br/>
        <div>Could not read package.json. Does it exist?</div>
      </Window>
    )
  }

  render() {

    if ( this.props.packageReadError ) {
      return this._renderNoPackageError()
    }

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
          {this.props.tab === ContextSwitcherConsts.FILES && <FilesWindow/>}
          {this.props.tab === ContextSwitcherConsts.GIT && <GitWindow/>}
        </div>
      </Window>
    );
  }
}

export default connect(
  (state) => ({
    tab: state.contextSwitcher.tab,
    packageReadError: state.workspace.packageReadError,
    packageData: state.workspace.package,
  })
)(App)
