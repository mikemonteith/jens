
import { handleActions } from 'redux-actions';

import * as constants from './constants';

const initialState = {
  directory: null,
  processingDirectory: false,
  packageData: {},
};

export default handleActions({
  [constants.DIRECTORY_SELECTED]: (state, action) => {
    return {
      ...state,
      directory: action.filePaths[0],
      processingDirectory: true,
    };
  },
  [constants.DIRECTORY_SELECTION_ERROR]: (state, action) => {
    return {
      ...state,
      directory: null,
      processingDirectory: false,
    }
  },
  [constants.PACKAGE_JSON_READ]: (state, action) => {
    return {
      ...state,
      packageData: action.data,
    }
  },
  [constants.PACKAGE_JSON_READ_ERROR]: (state, action) => {
    return {
      ...state,
      packageData: {},
    }
  }
}, initialState);
