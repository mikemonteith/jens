
import { handleActions } from 'redux-actions'

import { LOAD_SETTINGS } from './constants'

const initialState = {
  projectsDir: null,
}

export default handleActions({
  [LOAD_SETTINGS]: (state, action) => ({
    projectsDir: action.settings.projectsDir,
  }),
}, initialState)
