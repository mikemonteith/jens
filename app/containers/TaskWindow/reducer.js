
import { handleActions } from 'redux-actions';

import * as constants from './constants';

const initialState = {
  running: null,
  message: '',
  errorMessage: '',
  endCodes: {}
};

export default handleActions({
  [constants.START]: (state, action) => {
    return {
      ...state,
      running: action.taskName,
      message: state.message + `npm run ${action.taskName}`,
      endCodes: {
        ...state.endCodes,
        [action.taskName]: null,
      }
    }
  },
  [constants.END_WITH_CODE]: (state, action) => {
    return {
      ...state,
      running: null,
      endCodes: {
        ...state.endCodes,
        [action.taskName]: action.code,
      }
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
  },
}, initialState);
