
import Git from 'nodegit'
import fs from 'fs'
import path from 'path'

import { put, take, takeLatest } from 'redux-saga/effects'
import { GIT_CLONE_SUCCESS } from '../NewProject/constants'
import { DIRECTORY_SELECTED } from '../OpenDialog/constants'
import {
  OPEN_WORKSPACE,
  PACKAGE_JSON_READ,
  PACKAGE_JSON_READ_ERROR,
 } from './constants'


const setupGit = function* (dirpath) {
  console.log("DIRPATH", dirpath)

  // Open the git repo
  return yield Git.Repository.open(dirpath).then((repo) => {
      console.log(repo)
      window.repo = repo
      return repo
  })
}

function* listenToGitClone() {
  const action = yield take(GIT_CLONE_SUCCESS)
  yield put({type: OPEN_WORKSPACE, workingDirectory: action.repo.workdir(), repo: action.repo})
}

function* listenToDirectorySelect() {
  const action = yield take(DIRECTORY_SELECTED)
  try {
    const repo = yield setupGit(action.filePaths[0])
    yield put({type: OPEN_WORKSPACE, workingDirectory: repo.workdir(), repo})
  } catch (err) {
    // Could not open the git Directory
    // TODO: Handle this properly
    console.error(err)
  }
}

function* processDirectory () {
  /*
    When a new workspace is opened, we need to do a few things:
    1. Read the package.json file (if it exists)
  */
  yield takeLatest(OPEN_WORKSPACE, function* (action) {
    const { workingDirectory } = action

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
    listenToGitClone(),
    listenToDirectorySelect(),
    processDirectory(),
  ]
}
