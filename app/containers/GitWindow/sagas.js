
import { put, takeEvery, select } from 'redux-saga/effects'
import Git from 'nodegit'
import * as constants from './constants'
import * as actions from './actions'

import { getDir } from '../Workspace/selectors'

const getFileStatus = file => {
  return {
    path: file.path(),
    status: {
      isConflicted: !!file.isConflicted(),
      isDeleted: !!file.isDeleted(),
      isIgnored: !!file.isIgnored(),
      isStaged: !!file.inIndex(),
      isInWorkingTree: !!file.inWorkingTree(),
      isNew: !!file.isNew(),
      isModified: !!file.isModified(),
      isRenamed: !!file.isRenamed(),
      isTypechange: !!file.isTypechange()
    },
    headToIndex: file.headToIndex(),
    indexToWorkdir: file.indexToWorkdir(),
  }
}

function* update () {
  const repoDir = yield select(getDir)
  const statusFiles = yield Git.Repository.openExt(repoDir, 0, '/').then(repository => {
    return repository.getStatus()
  })
  yield put(actions.statusUpdated(statusFiles.map(getFileStatus)))
}

export default function* () {
  yield takeEvery(constants.UPDATE, update)
}
