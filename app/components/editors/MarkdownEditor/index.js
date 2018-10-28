import React from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'

require('react-mde/lib/styles/css/react-mde-all.css')

export default class MarkdownEditor extends React.Component {

  constructor(props) {
    super(props)
    if ( props.content ) {
      this.state = {
        mdeState: { markdown: props.content },
      }
    }
    this.converter = new Showdown.Converter({tables: true, simplifiedAutoLink: true});
  }

  componentWillReceiveProps(props) {
    this.setState({
      mdeState: { markdown: props.content },
    })
  }

  handleValueChange = mdeState => {
    this.setState({ mdeState })
  }

  render() {
    return (
      <ReactMde
        onChange={this.handleValueChange}
        editorState={this.state.mdeState}
        generateMarkdownPreview={markdown => Promise.resolve(this.converter.makeHtml(markdown))}
      />
    )
  }
}
