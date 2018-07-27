
import { handleActions } from 'redux-actions'

import { UPDATE_FILE_TREE, FILE_TREE_UPDATED } from './constants'

const initialState = {
  tree: undefined,
  updating: false,
}

export default handleActions({
  [UPDATE_FILE_TREE]: (state, action) => ({
    ...state,
    updating: true,
  }),
  [FILE_TREE_UPDATED]: (state, action) => ({
    ...state,
    updating: false,
    tree: action.tree,
  }),
}, initialState)
