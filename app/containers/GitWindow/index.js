
import React from 'react'
import classnames from 'classnames'

require('./style.scss')

import connect from '../../connect'
import * as actions from './actions'
import { selectFileStatus, selectPatches } from './selectors'

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

const Line = (props) => {
  return (
    <span className={classnames({
      'git-hunk__line': true,
      'git-hunk-line': true,
      'git-hunk-line--context': props.status === 'CONTEXT', //TODO use constants
      'git-hunk-line--addition': props.status === 'ADDITION',
      'git-hunk-line--removal': props.status === 'REMOVAL',
    })}>{props.content}</span>
  )
}

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
        <div className="patches">
          {this.props.patches && this.props.patches.map((patch, i) => (
            <div className="patch" key={i}>
              <h3>{ patch.newFilepath }</h3>
              {patch.hunks.map((hunk, i) => (
                <pre className="hunk" key={i}>
                  <Line content="..."/>{'\n'}
                  {hunk.lines.map((line, i) => (
                    <Line key={i} {...line}/>
                  ))}
                  <Line content="..."/>{'\n'}
                </pre>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    fileStatus: selectFileStatus(state),
    patches: selectPatches(state),
  }),
  (dispatch) => ({
    updateGit: () => dispatch(actions.update())
  })
)(GitWindow)
