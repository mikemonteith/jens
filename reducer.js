
import { combineReducers } from 'redux'

import appReducer from './app/reducer'
import windows from './app/containers/Windows/reducer'
import settings from './app/containers/Settings/reducer'

const baseReducer = combineReducers({
  windows,
  settings,
})

const partialReducer = (state, action) => {
  let windows = { ...state.windows }
  for ( const id in windows ) {
    windows[id] = appReducer(windows[id], action)
  }

  return {
    ...state,
    windows,
  }
}

export default (state, action) => {
  state = baseReducer(state, action)
  return partialReducer(state, action)
}
