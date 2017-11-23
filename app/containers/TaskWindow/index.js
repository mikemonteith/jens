import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

require('./style.scss')

import TaskRunner from './components/TaskRunner'

class TaskWindow extends React.Component {
  componentWillMount() {
    this.props.checkDependencies()
  }

  isMissingDependencies() {
    const dependencyList = this.props.tasks.dependencyList
    if (!dependencyList) {
      return undefined
    }

    return Object.keys(dependencyList.dependencies).reduce((acc, name) => {
      if(dependencyList.dependencies[name].missing === true) {
        return true
      } else {
        return acc
      }
    }, false)
  }

  render() {
    console.log(this.props)
    const packageData = this.props.workspace.package

    return (
      <div className="task-window">
        <div className="task-window__tasks-container">
          {this.isMissingDependencies() === true && <span>INSTALL REQUIRED</span>}
          <TaskRunner
            task="install"
            isRunning={this.props.tasks.isInstalling}
            onRunTask={this.props.onNpmInstall}
            endCode={this.props.tasks.installEndCode}
            errorMessage={this.props.tasks.installErrorMessage}
          />
          {Object.keys(packageData && packageData.scripts ? packageData.scripts : {}).map(key => (
            <TaskRunner
              task={key}
              key={key}
              isRunning={key === this.props.tasks.running}
              onRunTask={() => this.props.onRunTask(key)}
              endCode={this.props.tasks.endCodes[key]}
              errorMessage={this.props.tasks.errorMessage}
            />
          ))}
        </div>
        <div className="task-window__log">
          <pre>
            {this.props.tasks.message}
          </pre>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    workspace: state.workspace,
    tasks: state.tasks,
  }),
  (dispatch) => ({
    onRunTask: (taskName) => dispatch(actions.runTask(taskName)),
    onNpmInstall: () => dispatch(actions.npmInstall()),
    checkDependencies: () => dispatch(actions.checkDependencies())
  })
)(TaskWindow);
