
import taskRunner from '../../utils/runtask'
import { take, call, put, takeEvery } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

import * as actions from './actions'
import * as constants from './constants'

function createChannel(action) {

  return eventChannel(emitter => {
    const runner = taskRunner(action.taskName)

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
  const chan = yield call(createChannel, action)

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
