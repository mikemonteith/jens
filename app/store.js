
import { createStore, combineReducers } from 'redux';

import contextSwitcher from './containers/ContextSwitcher/reducer';

const rootReducer = combineReducers({
  contextSwitcher,
});

const initialState = {};

export default createStore(rootReducer, initialState);
