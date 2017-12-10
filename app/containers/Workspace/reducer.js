
import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

import contextSwitcher from '../ContextSwitcher/reducer'
import gitWindow from '../GitWindow/reducer'
import taskWindow from '../TaskWindow/reducer'

import * as constants from './constants'

const initialState = {
  repo: null,
  workingDirectory: null,
  package: null,
}

const workspace = handleActions({
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

export default combineReducers({
  contextSwitcher,
  git: gitWindow,
  tasks: taskWindow,
  workspace,

  meta: (state) => state || {},
})
