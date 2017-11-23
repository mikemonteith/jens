import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { electronEnhancer } from 'redux-electron-store';
import createElectronStorage from 'redux-persist-electron-storage';
import { persistStore, persistCombineReducers } from 'redux-persist'

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

export default () => {
  let config = { key: 'root', storage: createElectronStorage() }
  let reducer = persistCombineReducers(config, { main: rootReducer })
  store = createStore(reducer, enhancer);
  persistStore(store);

  sagaMiddleware.run(rootSaga)

  return store
}
