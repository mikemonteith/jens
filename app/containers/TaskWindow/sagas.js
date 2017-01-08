
import NpmUtil from '../../utils/npm'
import { take, call, put, takeEvery, select } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

export const getDir = (state) => state.openDialog.directory

import * as actions from './actions'
import * as constants from './constants'

function createChannel(action, dir) {

  return eventChannel(emitter => {
    const runner = new NpmUtil(dir).runTask(action.taskName)

    runner.on('message', (msg) => {
      emitter({type: constants.MESSAGE, value: msg.toString()})
    })

    runner.on('error', (msg) => {
      emitter({type: constants.ERROR_MESSAGE, value: msg.toString()})
    })

    runner.on('end', () => {
      emitter(END)
    })

    return () => {
      // TODO code to cancel this task runner
    }
  })
}

function* run(action) {
  const dir = yield select(getDir)
  const chan = yield call(createChannel, action, dir)

  try {
    while (true) {
      let msg = yield take(chan)
      yield put(actions.receiveTaskMessage(msg))
    }
  } finally {
    yield put(actions.endTask())
  }
}

export default function* () {
  yield takeEvery(constants.START, run)
}
