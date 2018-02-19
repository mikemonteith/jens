
import React from 'react'

import Button from '../../../components/Button'

export default class TaskRunner extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showError: false,
    }
  }

  render() {
    return (
      <div className="task-runner task-window__task-runner">
        NPM run {this.props.task}
        {this.props.isRunning ? (
          <span> Running...</span>
        ) : (
          <Button
            className="task-runner__button"
            onClick={this.props.onRunTask}
          >
            Run
          </Button>
        )}
        {this.props.endCode === 0 && <span>Success</span>}
        {this.props.endCode >= 1 && (
          <span>
            <span>Error</span>
            &nbsp;
            <span
              className="task-runner__show-hide-error"
              onClick={() => this.setState({ showError: !this.state.showError })}
            >
              ({this.state.showError ? 'hide' : 'show'})
            </span>
          </span>
        )}
        {this.state.showError && (
          <pre className="task-runner__error-message">{this.props.errorMessage}</pre>
        )}
      </div>
    )
  }
}
