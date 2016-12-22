
import { handleActions } from 'redux-actions';

import * as constants from './constants';

const initialState = {
    tab: constants.TASKS,
};

export default handleActions({
  [constants.SELECT_TAB]: (state, action) => {
    return {
      ...state,
      tab: action.key,
    };
  },
}, initialState);
