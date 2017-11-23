
import NpmUtil from '../../utils/npm'
import { take, call, put, takeEvery, select } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

import { getDir } from '../Workspace/selectors'
import * as constants from './constants'

import { PACKAGE_JSON_READ } from '../Workspace/constants'

const CHANNEL_MESSAGE = 'CHANNEL_MESSAGE'
const CHANNEL_ERROR = 'CHANNEL_ERROR'
const CHANNEL_END = 'CHANNEL_END'

function createChannel(runner) {
  return eventChannel(emitter => {
    runner.on('message', (msg) => {
      emitter({type: CHANNEL_MESSAGE, message: msg.toString()})
    })

    runner.on('error', (msg) => {
      emitter({type: CHANNEL_ERROR, message: msg.toString()})
    })

    runner.on('end', (code) => {
      emitter({type: CHANNEL_END, code})
      emitter(END)
    })

    return () => {
      // TODO code to cancel this task runner
    }
  })
}

function* run(action) {
  const dir = yield select(getDir)
  const runner = new NpmUtil(dir).runTask(action.taskName)
  const chan = yield call(createChannel, runner)

  try {
    while (true) {
      let action = yield take(chan)
      switch (action.type) {
        case CHANNEL_MESSAGE:
          yield put({
            type: constants.MESSAGE,
            message: action.message,
          })
          break
        case CHANNEL_ERROR:
          yield put({
            type: constants.ERROR_MESSAGE,
            message: action.message,
          })
          break
        case CHANNEL_END:
          yield put({
            type: constants.END_WITH_CODE,
            code: action.code,
          })
          break
        default:
          // do nothing if channel action is not recognised
          break
      }
    }
  } finally {}
}

function* npmInstall() {
  const dir = yield select(getDir)
  const runner = new NpmUtil(dir).install()
  const chan = yield call(createChannel, runner)

  try {
    while (true) {
      let action = yield take(chan)
      switch (action.type) {
        case CHANNEL_MESSAGE:
          yield put({
            type: constants.NPM_INSTALL_MESSAGE,
            message: action.message,
          })
          break
        case CHANNEL_ERROR:
          yield put({
            type: constants.NPM_INSTALL_ERROR_MESSAGE,
            message: action.message,
          })
          break
        case CHANNEL_END:
          yield put({
            type: constants.NPM_INSTALL_END,
            code: action.code,
          })
          break
        default:
          // do nothing if channel action is not recognised
          break
      }
    }
  } finally {}
}

function* checkDependencies(action) {
  const dir = yield select(getDir)
  console.log(dir)
  if (!dir) return
  const runner = new NpmUtil(dir).list()
  const chan = yield call(createChannel, runner)

  let output = ''
  try {
    while (true) {
      let action = yield take(chan)
      switch (action.type) {
        case CHANNEL_MESSAGE:
          output += action.message
          yield put({
            type: constants.DEPENDENCY_LIST_MESSAGE,
            message: action.message,
          })
          break
        case CHANNEL_ERROR:
          yield put({
            type: constants.DEPENDENCY_LIST_ERROR_MESSAGE,
            message: action.message,
          })
          break
        case CHANNEL_END:
          yield put({
            type: constants.DEPENDENCY_LIST_END,
            code: action.code,
            output: JSON.parse(output),
          })
          break
        default:
          // do nothing if channel action is not recognised
          break
      }
    }
  } finally {}
}

export default function* () {
  yield takeEvery(constants.START, run)
  yield takeEvery(constants.NPM_INSTALL_START, npmInstall)
  yield [
    PACKAGE_JSON_READ,
    constants.NPM_INSTALL_END,
    constants.CHECK_DEPENDENCIES
  ].map(actionType => (
    takeEvery(actionType, checkDependencies)
  ))
}
