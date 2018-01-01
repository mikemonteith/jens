import { handleActions } from 'redux-actions'

import { DIRECTORY_SELECTED } from '../OpenDialog/constants'
import { GIT_CLONE_SUCCESS } from '../NewProject/constants'
import {
  WINDOWS_INIT,
  WINDOW_CLOSED,
} from './constants'

const initialState = {
  'new-project': {
    type: 'new-project'
  }
}

export default handleActions({
  //TODO: "directory selected" should fire a saga that actually creates the window
  [GIT_CLONE_SUCCESS]: (state, action) => {
    const uid = Math.random()
    return {
      ...state,
      [uid]: {
        type: 'app',
        meta: {
          workdir: action.dir,
        },
        workspace: {
          //TODO we are assuming we know the structure of workspace state here,
          //we should let this happen inside the workspace reducer somehow instead
          workingDirectory: action.dir
        }
      }
    }
  },
  [DIRECTORY_SELECTED]: (state, action) => {
    const uid = Math.random() //TODO: THIS SHOULD BE DONE IN AN ACTION!!!
    return {
      ...state,
      [uid]: {
        type: 'app',
        meta: {
          workdir: action.filePaths[0],
        },
        workspace: {
          //TODO we are assuming we know the structure of workspace state here,
          //we should let this happen inside the workspace reducer somehow instead
          workingDirectory: action.filePaths[0]
        }
      }
    }
  },
  [WINDOWS_INIT]: (state, action) => {
    if (Object.keys(state).length === 0) {
      return {
        ...initialState,
      }
    } else {
      return { ...state }
    }
  },
  [WINDOW_CLOSED]: (state, action) => {
    const newState = { ...state }
    delete newState[action.id]
    return newState
  },
}, initialState)
