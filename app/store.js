
import { createStore, combineReducers } from 'redux';

import contextSwitcher from './containers/ContextSwitcher/reducer';

const rootReducer = combineReducers({
  contextSwitcher,
});

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
