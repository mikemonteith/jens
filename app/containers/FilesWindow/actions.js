
import { UPDATE_FILE_TREE, FILE_TREE_UPDATED } from './constants'

export const  updateFileTree = () => ({
  type: UPDATE_FILE_TREE,
})

export const fileTreeUpdated = (tree) => ({
  type: FILE_TREE_UPDATED,
  tree,
})
