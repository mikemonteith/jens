
import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

require('./style.scss')

import * as actions from './actions'
import { selectFileStatus } from './selectors'

const File = props => (
  <p
    className={classnames({
      "git-window__file": true,
      'git-window-file': true,
      'git-window-file--new': props.status.isNew,
      'git-window-file--modified': props.status.isModified,
      'git-window-file--staged': props.status.isStaged,
      'git-window-file--working-tree': props.status.isInWorkingTree,
    })}
  >{props.children}</p>
)

class GitWindow extends React.Component {
  componentWillMount() {
    this.props.updateGit()
  }

  render() {
    return (
      <div className="git-window">
        {this.props.fileStatus.map((file, i) => (
          <File key={i} status={file.status}>{file.path}</File>
        ))}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    fileStatus: selectFileStatus(state)
  }),
  (dispatch) => ({
    updateGit: () => dispatch(actions.update())
  })
)(GitWindow)
