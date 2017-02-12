
import NpmUtil from '../../utils/npm'
import { take, call, put, takeEvery, select } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

import { getDir } from '../OpenDialog/selectors'
import * as constants from './constants'

function createChannel(action, dir) {

  return eventChannel(emitter => {
    const { taskName } = action
    const runner = new NpmUtil(dir).runTask(taskName)

    runner.on('message', (msg) => {
      emitter({type: constants.MESSAGE, taskName, message: msg.toString()})
    })

    runner.on('error', (msg) => {
      emitter({type: constants.ERROR_MESSAGE, taskName, message: msg.toString()})
    })

    runner.on('end', (code) => {
      emitter({type: constants.END_WITH_CODE, taskName, code})
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
      let action = yield take(chan)
      yield put(action)
    }
  } finally {}
}

export default function* () {
  yield takeEvery(constants.START, run)
}
