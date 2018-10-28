import dirTree from 'directory-tree'
import { put, takeEvery, select } from 'redux-saga/effects'

import { getDir } from '../Workspace/selectors'

import { UPDATE_FILE_TREE } from './constants'
import { fileTreeUpdated } from './actions';

function* update () {
  const repoDir = yield select(getDir)
  const tree = dirTree(repoDir, { exclude: /.git|node_modules/ })
  yield put(fileTreeUpdated(tree))
}

export default function* () {
  yield takeEvery(UPDATE_FILE_TREE, update)
}
