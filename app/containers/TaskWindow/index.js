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
        <Button className="task-runner__button" onClick={() => this.props.onRunTask(props.task)}>Run</Button>
      </span>
    )

    return (
      <div className="task-window">
        <div className="task-window__tasks-container">
          <TaskRunner task="lint" onRunTask={this.props.onRunTask} />
          <TaskRunner task="test" onRunTask={this.props.onRunTask} />
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({

  }),
  (dispatch) => ({
    onRunTask: (taskName) => actions.runTask(taskName),
  })
)(TaskWindow);
