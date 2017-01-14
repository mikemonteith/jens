import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

require('./style.scss')

import Button from '../../components/button'

class TaskWindow extends React.Component {
  render() {

    const TaskRunner = (props) => (
      <span className="task-runner task-window__task-runner">
        NPM run {props.task}
        {props.isRunning ? (
          <span> Running...</span>
        ) : (
          <Button className="task-runner__button" onClick={() => this.props.onRunTask(props.task)}>Run</Button>
        )}
      </span>
    )

    const packageData = this.props.openDialog.packageData

    return (
      <div className="task-window">
        <div className="task-window__tasks-container">
          {Object.keys(packageData && packageData.scripts ? packageData.scripts : {}).map(key => (
            <TaskRunner
              task={key}
              key={key}
              isRunning={key === this.props.tasks.running}
              onRunTask={this.props.onRunTask}
            />
          ))}
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
