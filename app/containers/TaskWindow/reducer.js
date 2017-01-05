
import { handleActions } from 'redux-actions';

import * as constants from './constants';

const initialState = {
  running: null,
  message: '',
  errorMessage: '',
};

export default handleActions({
  [constants.START]: (state, action) => {
    return {
      ...state,
      running: action.taskName,
    }
  },
  [constants.END]: (state, action) => {
    return {
      ...state,
      running: null,
    }
  },
  [constants.MESSAGE]: (state, action) => {
    return {
      ...state,
      message: state.message + action.message,
    }
  },
  [constants.ERROR_MESSAGE]: (state, action) => {
    return {
      ...state,
      errorMessage: state.errorMessage + action.message,
    }
  }
}, initialState);
