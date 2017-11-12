
import { put, takeLatest } from 'redux-saga/effects'
import { GIT_CLONE_SUCCESS } from '../NewProject/constants'
import { OPEN_WORKSPACE } from './constants'

function* listenToGitCloneSuccess() {
  yield takeLatest(GIT_CLONE_SUCCESS, function* (action) {
    yield put({ type: OPEN_WORKSPACE })
  })
}

export default function* () {
  yield [
    listenToGitCloneSuccess(),
  ]
}
