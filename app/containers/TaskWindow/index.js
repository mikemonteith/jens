import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

require('./style.scss')

import TaskRunner from './components/TaskRunner'

class TaskWindow extends React.Component {
  render() {
    const packageData = this.props.openDialog.packageData

    return (
      <div className="task-window">
        <div className="task-window__tasks-container">
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
    openDialog: state.openDialog,
    tasks: state.tasks,
  }),
  (dispatch) => ({
    onRunTask: (taskName) => dispatch(actions.runTask(taskName)),
  })
)(TaskWindow);
