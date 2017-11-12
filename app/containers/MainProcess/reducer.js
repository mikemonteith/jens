
import { handleActions } from 'redux-actions'
import { app } from 'electron'

import * as constants from './constants'
import * as newProjectConstants from '../NewProject/constants'

const initialState = {
  settings: {
    projectsDir: app.getPath('userData'),
  },
  windows: {
    'new-project': {
      type: 'new-project'
    },
    'app': {
      type: 'app'
    }
  }
}

export default handleActions({
  [constants.WINDOWS_INIT]: (state, action) => ({
    ...state,
    windows: {
      'new-project': {
        type: 'new-project'
      },
    }
  }),
  [constants.WINDOW_CLOSED]: (state, action) => {
    let windows = { ...state.windows }
    delete windows[action.id]

    return {
      ...state,
      windows,
    }
  },
  [newProjectConstants.GIT_CLONE_SUCCESS]: (state, action) => ({
    ...state,
    // Add a window
    windows: {
      'app': {
        type: 'app',
        repo: action.repo,
      }
    }
  }),
}, initialState)
