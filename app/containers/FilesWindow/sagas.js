import fs from 'fs'

import dirTree from 'directory-tree'
import { put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import { getDir } from '../Workspace/selectors'

import { UPDATE_FILE_TREE, SAVE_FILE } from './constants'
import { fileTreeUpdated, saveFileSuccess } from './actions';

function* update () {
  const repoDir = yield select(getDir)
  const tree = dirTree(repoDir, { exclude: /.git|node_modules/ })
  yield put(fileTreeUpdated(tree))
}

/**
 * Save a file asynchronously
 */
function* saveFile(action) {
  const { filepath, content } = action

  const err = yield new Promise((resolve, reject) => {
    fs.writeFile(filepath, content, 'utf8', (err) => {
      if(err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })

  if(err) {
    //TODO: surface this error to the user
    console.warn(`Error saving file ${filepath}, ${err.message}`)
  } else {
    yield put(saveFileSuccess(filepath))
  }
}

export default function* () {
  yield takeEvery(UPDATE_FILE_TREE, update)
  yield takeLatest(SAVE_FILE, saveFile)
}
