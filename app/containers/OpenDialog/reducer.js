
import { handleActions } from 'redux-actions';

import * as constants from './constants';

const initialState = {
  directory: null,
  processingDirectory: false,
};

export default handleActions({
  [constants.DIRECTORY_SELECTED]: (state, action) => {
    return {
      ...state,
      directory: action.filePaths[0],
    };
  },
  [constants.DIRECTORY_SELECTION_ERROR]: (state, action) => {
    return {
      ...state,
      directory: null,
    }
  },
}, initialState);
