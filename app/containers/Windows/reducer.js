import { handleActions } from 'redux-actions'
import { CLOSE_WINDOW, INIT_WINDOWS } from 'redux-electron-windows'

import { OPEN_PROJECT_WINDOW, CLOSE_NEW_PROJECT_WINDOW } from './constants'

/**
 * Each key defines one window
 */
const initialState = {
  'new-project': {
    type: 'new-project'
  }
}

export default handleActions({
  [OPEN_PROJECT_WINDOW]: (state, action) => {
    const uid = action.uid;
    return {
      ...state,
      [uid]: {
        type: 'app',
        maximize: true,
        meta: {
          workdir: action.dir,
        },
        workspace: {
          //TODO we are assuming we know the structure of workspace state here,
          //we should let this happen inside the workspace reducer somehow instead
          workingDirectory: action.dir,
        }
      }
    }
  },
  [INIT_WINDOWS]: (state, action) => {
    if (Object.keys(state).length === 0) {
      return {
        ...initialState,
      }
    } else {
      return { ...state }
    }
  },
  [CLOSE_WINDOW]: (state, action) => {
    const newState = { ...state }
    delete newState[action.id]
    return newState
  },
  [CLOSE_NEW_PROJECT_WINDOW]: (state, action) => {
    const newState = { ...state }
    delete newState[action.source]
    return newState
  },
}, initialState)
