
import {
  UPDATE_FILE_TREE,
  FILE_TREE_UPDATED,
  SAVE_FILE,
  SAVE_FILE_SUCCESS,
} from './constants'

export const  updateFileTree = () => ({
  type: UPDATE_FILE_TREE,
})

export const fileTreeUpdated = (tree) => ({
  type: FILE_TREE_UPDATED,
  tree,
})

export const saveFile = (filepath, content) => ({
  type: SAVE_FILE,
  filepath,
  content,
})

export const saveFileSuccess = (filepath) => ({
  type: SAVE_FILE_SUCCESS,
  filepath,
})
