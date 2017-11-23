
import { handleActions } from 'redux-actions'
import { app } from 'electron'

import * as constants from './constants'
import * as workspaceConstants from '../Workspace/constants'

const initialState = {
  settings: {
    projectsDir: app.getPath('userData'),
  },
  windows: {
    'new-project': {
      type: 'new-project'
    }
  },
}

export default handleActions({
  [constants.WINDOWS_INIT]: (state, action) => {
    if (Object.keys(state.windows).length === 0) {
      return {
        ...state,
        windows: {
          ...initialState.windows
        }
      }
    } else {
      return { ...state }
    }
  },
  [constants.WINDOW_CLOSED]: (state, action) => {
    let windows = { ...state.windows }
    delete windows[action.id]

    return {
      ...state,
      windows,
    }
  },
  [workspaceConstants.OPEN_WORKSPACE]: (state, action) => ({
    ...state,
    // Add a window
    windows: {
      'app': {
        type: 'app',
        repo: action.repo,
        maximize: true,
      }
    }
  }),
}, initialState)
