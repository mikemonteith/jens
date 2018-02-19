import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { electronEnhancer } from 'redux-electron-store';
import createElectronStorage from 'redux-persist-electron-storage';
import { persistStore, persistReducer } from 'redux-persist'

import rootReducer from './reducer'
import rootSaga from './sagas'
import windowMiddleware from './windowMiddleware'
import preloadedTestReducer from './preloadedTestReducer'

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

export default (done) => {
  let config = { key: 'main', debug: true, storage: createElectronStorage() }
  let reducer = rootReducer
  if (process.env.MOCK_INITIAL_STATE) {
    const mockState = require(process.env.MOCK_INITIAL_STATE).default
    reducer = preloadedTestReducer(reducer, mockState)
  }
  reducer = persistReducer(config, reducer)
  store = createStore(reducer, enhancer);
  persistStore(store, null, done)
    .purge()

  sagaMiddleware.run(rootSaga)

  return store
}
