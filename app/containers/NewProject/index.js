import React from 'react'
import { connect } from 'react-redux'

require('./style.scss')

import Button from '../../components/Button'
import Loading from '../../components/Loading'
import Text from '../../components/Text'
import TextInput from '../../components/TextInput'
import Window from '../../components/Window'

import * as actions from './actions'

class NewProject extends React.Component {
  constructor() {
    super()
    this.state = {
      repoUrl: '',
    }
  }

  _getCloneDir() {
    return this.props.newProject.cloneDirOverride || this.props.settings.projectsDir
  }

  render() {
    return (
      <Window className="new-project">
        <div className="new-project__inputs new-project-inputs">

          <Text className="new-project-inputs__cloning-into">
            Cloning into
            <span className="new-project-inputs__directory">
              &nbsp;{this._getCloneDir()}&nbsp;
            </span>
            <span
              className="new-project-inputs__change-dir"
              onClick={() => {
                this.props.onDirectoryChange()
              }}
            >Change</span>
          </Text>

          <TextInput
            className="new-project-inputs__url-input"
            value={this.state.repoUrl}
            onChange={event => this.setState({ repoUrl: event.target.value })}
            placeholder="https://github.com/your/project.git"
            error={this.props.newProject.err && this.props.newProject.err.message}
          />

          <Loading progress={ !!this.props.newProject.isCloning ? 100 : 0 } />
        </div>

        <div className="new-project__buttons">
          <Button
            className="new-project__button"
            type='secondary'
            onClick={() => {
              // TODO: close this window
              alert("TODO")
            }}
          >Cancel</Button>
          <Button
            className="new-project__button"
            disabled={ !this.state.repoUrl }
            onClick={() => {
              this.props.onClone(this.state.repoUrl, this._getCloneDir())
            }}
          >Clone</Button>
        </div>
      </Window>
    )
  }
}

export default connect(
  (state) => ({
    newProject: state.newProject,
    settings: state.main.settings,
  }),
  (dispatch) => ({
    onClone: (url, dir) => dispatch(actions.clone(url, dir)),
    onDirectoryChange: () => dispatch(actions.changeDirectory()),
  })
)(NewProject)
