
import { handleActions } from 'redux-actions'
import * as constants from './constants'

const initialState = {
  repo: null,
  workingDirectory: null,
  package: null,
}

export default handleActions({
  [constants.OPEN_WORKSPACE]: (state, action) => ({
    ...state,
    repo: action.repo,
    workingDirectory: action.workingDirectory,
  }),
  [constants.PACKAGE_JSON_READ]: (state, action) => ({
    ...state,
    package: action.data,
  }),
  [constants.PACKAGE_JSON_READ_ERROR]: (state, action) => ({
    ...state,
    package: null,
    packageReadError: action.err
  }),
}, initialState)
