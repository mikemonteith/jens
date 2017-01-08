
import path from 'path'
import fs from 'fs'

import { eventChannel } from 'redux-saga'
import { take, put, call, takeLatest } from 'redux-saga/effects'
import { ipcRenderer, remote } from 'electron'

import {
  OPEN_DIALOG,
  DIRECTORY_SELECTED,
  DIRECTORY_SELECTION_ERROR,
  PACKAGE_JSON_READ,
  PACKAGE_JSON_READ_ERROR,
} from './constants'

function openDialog() {
  return new Promise((resolve, reject) => {
    remote.dialog.showOpenDialog({
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

function* listenToIPCEvent () {
  //listen for the menu-open event
  const chan = eventChannel(emitter => {

    ipcRenderer.on(OPEN_DIALOG, (event, selector) => {
      emitter({type: OPEN_DIALOG})
    });

    return () => {} //Not cancelable
  })

  try {
    while (true) {
      let action = yield take(chan)
      yield put(action)
    }
  } finally {
    console.warn('This listener should never end')
    //This listener never ends
  }
}

function* processDirectory () {
  yield takeLatest(DIRECTORY_SELECTED, function* (action) {
    const dirpath = action.filePaths[0]

    //verify directory is an NPM package by looking for a package.json
    try {
      const packageData = yield new Promise((resolve, reject) => {
        fs.readFile(path.join(dirpath, 'package.json'), {encoding: 'utf-8'}, (err, data) => {
          if(err) {
            reject(err);
          } else {
            try {
              resolve(JSON.parse(data))
            } catch (jsonErr) {
              reject(jsonErr);
            }
          }
        });
      });
      yield put({type: PACKAGE_JSON_READ, data: packageData})
    } catch (err) {
      yield put({type: PACKAGE_JSON_READ_ERROR})
    }
  })
}

export default function* () {
  yield [
    listenToIPCEvent(),
    listenToOpenButton(),
    processDirectory(),
  ]
}
