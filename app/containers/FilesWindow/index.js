import fs from 'fs'
import path from 'path'

import React from 'react'

import MarkdownEditor from '../../components/editors/MarkdownEditor'
import TextEditor from '../../components/editors/TextEditor'

require('./style.scss')

import connect from '../../connect'
import { updateFileTree } from './actions'
import { selectFileTree } from './selectors'

const renderNode = (props, i) => {
  const node = props.node
  if (!node) {
    return null
  }

  if(node.type === 'directory') {
    return <Dir key={i} node={node} onDoubleClick={props.onDoubleClick} />
  } else if(node.type === 'file') {
    return <File key={i} node={node} onDoubleClick={props.onDoubleClick} />
  }
}

const Dir = props => (
  <li className="files-window-directory">
    <p
      onDoubleClick={props.onDoubleClick.bind(this, props.node)}
      className="filies-window-directory__name"
    >
      {props.node.name}
    </p>
    <ol className="files-window-directory__children">
      {props.node.children.map((child, i) => {
        props = {node: child, onDoubleClick: props.onDoubleClick}
        return renderNode(props, i)
      })}
    </ol>
  </li>
)

const File = props => (
  <li className="files-window-file">
    <p
      className="files-window-file__name"
      onDoubleClick={props.onDoubleClick.bind(this, props.node)}
    >
      {props.node.name}
    </p>
  </li>
)

class FilesWindow extends React.Component {
  componentWillMount() {
    this.props.updateFileTree()
  }

  constructor(props) {
    super(props);
    this.state = {
      content: null,
    }
  }

  handleValueChange = mdeState => {
    this.setState({ mdeState })
  }

  onDoubleClick = node => {
    if(node.type === 'file') {
      //TODO: async
      const content = fs.readFileSync(node.path, "utf8")
      this.setState({
        filepath: node.path,
        content,
      })
    } else if(node.type === 'directory') {
      // TODO: toggle open/close the directory
    }
  }

  renderEditor() {
    const { filepath } = this.state
    if (!filepath) {
      return null
    }

    const ext = path.extname(filepath).toLowerCase()

    switch (ext) {
      case '.md':
      case '.markdown':
        return (
          <MarkdownEditor
            id={this.state.filepath}
            content={this.state.content}
          />
        )
      case '.json':
        // TODO
        break;
      case '.html':
      default:
        return (
          <TextEditor
            id={this.state.filepath}
            content={this.state.content}
          />
        )
    }
  }

  render() {
    return (
      <div className="files-window">
        <div className="files-window-filetree">
          <ol>
            {renderNode({
              node: this.props.tree,
              onDoubleClick: this.onDoubleClick.bind(this),
            })}
          </ol>
        </div>
        <div className="files-window-editor">
          {this.renderEditor()}
        </div>
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
