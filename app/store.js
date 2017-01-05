
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import taskWindowSagas from './containers/TaskWindow/sagas';

import rootReducer from './reducer'

const sagaMiddleware = createSagaMiddleware()

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(taskWindowSagas)

export default store;
