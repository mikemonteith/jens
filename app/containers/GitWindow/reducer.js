
import { handleActions } from 'redux-actions'

import * as constants from './constants'

const initialState = {
  status: {
    files: []
  },
  patches: [],
}

export default handleActions({
  [constants.UPDATE]: (state, action) => {
  },
  [constants.STATUS_UPDATED]: (state, action) => ({
    ...state,
    status: {
      ...state.status,
      files: action.files,
    }
  }),
  [constants.PATCHES_UPDATED]: (state, action) => ({
    ...state,
    patches: action.patches,
  })
}, initialState)
