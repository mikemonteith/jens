import querystring from 'querystring'

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { electronEnhancer } from 'redux-electron-store';

import reducer from '../reducer'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const initialState = {}

const params = querystring.parse(global.location.search.substring(1))
const { windowId } = params

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(sagaMiddleware),
    electronEnhancer({
      sourceName: windowId,
    }),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

sagaMiddleware.run(rootSaga)

export default store

store.dispatch({ type: 'WINDOW_INIT' })
