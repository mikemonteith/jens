
import React from 'react'
import classnames from 'classnames'

require('./style.scss')

import connect from '../../connect'
import * as actions from './actions'
import { selectFileStatus, selectPatches } from './selectors'
import Button from '../../components/Button'

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

const Hunk = props => (
  <div className="git-hunk">
    <pre className="git-hunk__code">
      <Line content="..."/>{'\n'}
      {props.hunk.lines.map((line, i) => (
        <Line key={i} {...line}/>
      ))}
      <Line content="..."/>{'\n'}
    </pre>
  </div>
)

const Patch = props => (
  <div className="patch">
    <h3>{ props.patch.newFilepath }</h3>
    {props.patch.hunks.map((hunk, i) => (
      <Hunk key={i} hunk={hunk} onAddFile={props.onAddFile} />
    ))}
    <div className="git-patch__buttons">
      <Button
        onClick={() => props.onAddFile(props.patch.newFilepath)}
      >Accept</Button>
      <Button
        onClick={() => props.onCheckoutFile(props.patch.newFilepath)}
        type='warning'
      >Reject</Button>
    </div>
  </div>
)

class GitWindow extends React.Component {
  componentWillMount() {
    this.props.updateGit()
  }

  _renderStagedFiles() {
    const stagedFiles = this.props.fileStatus.filter(file => file.status.isStaged)
    if(stagedFiles.length === 0) {
      return null
    }
    return (
      <div className="staged">
        <h2>Ready to commit:</h2>
        {stagedFiles.map((file, i) => (
          <File key={i} status={file.status}>{file.path}</File>
        ))}
      </div>
    )
  }

  _renderHunks() {
    const { patches } = this.props
    if(!patches) {
      return null
    }
    return (
      <div className="patches">
        <h2>Changes to review:</h2>
        {patches.map((patch, i) => (
          <Patch
            key={i}
            patch={patch}
            onCheckoutFile={this.props.checkoutFile.bind(this)}
            onAddFile={this.props.addFile.bind(this)}
          />
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="git-window">
        {this._renderStagedFiles()}
        {this._renderHunks()}
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
    updateGit: () => dispatch(actions.update()),
    addFile: (filepath) => dispatch(actions.addFile(filepath)),
    checkoutFile: (filepath) => dispatch(actions.checkoutFile(filepath)),
  })
)(GitWindow)
