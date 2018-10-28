import React from 'react'
import {Editor, EditorState, ContentState, RichUtils} from 'draft-js'

require('draft-js/dist/Draft.css')

export default class TextEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(props.content)
      ),
    }
  }

  onChange(editorState) {
    this.setState({ editorState })

    const plainText = editorState.getCurrentContent().getPlainText()
    this.props.onChange(plainText)
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange.bind(this)}
        handleKeyCommand={this.handleKeyCommand}
      />
    )
  }

}
