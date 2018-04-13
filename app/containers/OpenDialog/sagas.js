
import { put, call, takeLatest } from 'redux-saga/effects'
import { dialog } from 'electron'

import {
  OPEN_DIALOG,
  DIRECTORY_SELECTED,
  DIRECTORY_SELECTION_ERROR,
} from './constants'
import { openProjectWindow } from '../Windows/actions'

function openDialog() {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({
      properties: ['openDirectory'],
    }, (filePaths) => {
      if(filePaths) {
        resolve(filePaths)
      } else {
        reject('No directory selected')
      }
    })
  })
}

function* listenToOpenButton () {
    yield takeLatest(OPEN_DIALOG, function* () {
      try {
        const filePaths = yield call(openDialog)
        yield put({type: DIRECTORY_SELECTED, filePaths})
      } catch (err) {
        yield put({type: DIRECTORY_SELECTION_ERROR})
      }
    })
}

function* listenToDirectorySelection () {
  yield takeLatest(DIRECTORY_SELECTED, function* ({filePaths}) {
    yield put(openProjectWindow({dir: filePaths[0]}))
  })
}

export default function* () {
  yield [
    listenToOpenButton(),
    listenToDirectorySelection(),
  ]
}
