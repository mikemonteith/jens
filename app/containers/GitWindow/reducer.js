
import { handleActions } from 'redux-actions';

import * as constants from './constants';

const initialState = {
  files: {
    staged: [],
    tracked: [],
    untracked: [],
  },
};

export default handleActions({
    [constants.UPDATE]: (state, action) => {
  },
}, initialState);
