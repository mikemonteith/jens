import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { electronEnhancer } from 'redux-electron-store';

import rootReducer from './app/containers/MainProcess/reducer'
import rootSaga from './app/containers/MainProcess/sagas'
import windowMiddleware from './windowMiddleware'

const sagaMiddleware = createSagaMiddleware()

let store

let enhancer = compose(
  applyMiddleware(sagaMiddleware, windowMiddleware),
  // Must be placed after any enhancers which dispatch
  // their own actions such as redux-thunk or redux-saga
  electronEnhancer({
    // Necessary for synched actions to pass through all enhancers
    dispatchProxy: a => {
      store.dispatch(a);
    },
  })
);

store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga)

export default store
