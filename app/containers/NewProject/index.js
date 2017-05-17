import React from 'react'
import { connect } from 'react-redux'

import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import * as actions from './actions'

class NewProject extends React.Component {
    constructor() {
        super()
        this.state = {
            repoUrl: '',
        }
    }

    render() {
        return (
            <div className="new-project">
                <span>Repository URL</span>
                <TextInput
                    value={this.state.repoUrl}
                    onChange={repoUrl => this.setState({repoUrl})}
                    placeholder="https://github.com/your/project.git"
                />

                <span>Clone into</span>
                <span>{this.props.newProject.projectsDir}</span>

                <Button
                    onClick={() => {
                        this.props.onClone(this.state.repoUrl, this.props.newProject.projectsDir)
                    }}
                >Clone</Button>

                { this.props.newProject.err && (
                    <span>ERROR: {this.props.newProject.err.message}</span>
                )}
            </div>
        )
    }
}

export default connect(
    (state) => ({
        newProject: state.newProject,
    }),
    (dispatch) => ({
        onClone: (url, dir) => dispatch(actions.clone(url, dir))
    })
)(NewProject)
