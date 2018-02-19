
import fs from 'fs'
import path from 'path'

import { put, takeLatest, select } from 'redux-saga/effects'
import { getDir } from './selectors'
import {
  PACKAGE_JSON_READ,
  PACKAGE_JSON_READ_ERROR,
 } from './constants'

function* processDirectory () {
  /*
    When a new workspace is opened, we need to do a few things:
    1. Read the package.json file (if it exists)
  */
  const workingDirectory = yield select(getDir)
  yield takeLatest('WINDOW_INIT', function* (action) {
    //verify directory is an NPM package by looking for a package.json
    try {
      const packageData = yield new Promise((resolve, reject) => {
        fs.readFile(path.join(workingDirectory, 'package.json'), {encoding: 'utf-8'}, (err, data) => {
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
      yield put({type: PACKAGE_JSON_READ_ERROR, err})
    }
  })
}

export default function* () {
  yield [
    processDirectory(),
  ]
}
