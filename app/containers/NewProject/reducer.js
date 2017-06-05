
import { handleActions } from 'redux-actions'
import { remote } from 'electron'

import * as constants from './constants'

const initialState = {
    projectsDir: remote.getCurrentWindow().electronApp.getPath('userData'),
    isCloning: false,
}

export default handleActions({
  [constants.GIT_CLONE]: (state, action) => ({
      ...state,
      isCloning: true,
      err: null,
  }),
  [constants.GIT_CLONE_ERROR]: (state, action) => ({
      ...state,
      isCloning: false,
      err: action.err,
  }),
  [constants.GIT_CLONE_SUCCESS]: (state, action) => ({
      ...state,
      isCloning: false,
      err: null,
  })
}, initialState)
