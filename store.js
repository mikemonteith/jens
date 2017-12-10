import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { electronEnhancer } from 'redux-electron-store';
import createElectronStorage from 'redux-persist-electron-storage';
import { persistStore, persistReducer } from 'redux-persist'

import rootReducer from './reducer'
import rootSaga from './sagas'
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
  let config = { key: 'main', debug: true, storage: createElectronStorage() }
  let reducer = persistReducer(config, rootReducer)
  store = createStore(reducer, enhancer);
  persistStore(store)
    .purge()

  sagaMiddleware.run(rootSaga)

  return store
}
