
import { handleActions } from 'redux-actions'
import * as constants from 'constants'

const initialState = {

}

export default handleActions({
  [constants.OPEN_WORKSPACE]: (state, action) => ({
    ...state,
  }),
}, initialState)
