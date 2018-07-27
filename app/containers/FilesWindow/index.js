
import React from 'react'

require('./style.scss')

import connect from '../../connect'
import { updateFileTree } from './actions'
import { selectFileTree } from './selectors'

const renderNode = (node, i) => {
  if (!node) {
    return null
  }

  if(node.type === 'directory') {
    return <Dir key={i} node={node} />
  } else if(node.type === 'file') {
    return <File key={i} node={node} />
  }
}

const Dir = props => (
  <li className="files-window-directory">
    <p className="filies-window-directory__name">{props.node.name}</p>
    <ol className="files-window-directory__children">
      {props.node.children.map(renderNode)}
    </ol>
  </li>
)

const File = props => (
  <li className="files-window-file">
    <p className="files-window-file__name">{props.node.name}</p>
  </li>
)

class FilesWindow extends React.Component {
  componentWillMount() {
    this.props.updateFileTree()
  }

  render() {
    return (
      <div className="files-window">
        <ol>
          {renderNode(this.props.tree)}
        </ol>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    tree: selectFileTree(state),
  }),
  (dispatch) => ({
    updateFileTree: () => dispatch(updateFileTree()),
  })
)(FilesWindow)
