
import url from 'url'

import { put, call, takeLatest, select } from 'redux-saga/effects'
import { remote } from 'electron'
import Git from 'nodegit'

import {
    GIT_CLONE,
    GIT_CLONE_SUCCESS,
    GIT_CLONE_ERROR,
    CHANGE_GIT_DIRECTORY,
    CHANGE_GIT_DIRECTORY_SUCCESS,
    CHANGE_GIT_DIRECTORY_ERROR
} from './constants'
import { openProjectWindow, closeNewProjectWindow } from '../Windows/actions'

const getDirectory = state => state.newProject && state.newProject.projectsDir

function openDirectoryChooser(currentDir) {
  return new Promise((resolve, reject) => {
    remote.dialog.showOpenDialog({
      defaultPath: currentDir,
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

function* listenToDirectoryChange() {
  const currentDir = yield select(getDirectory);
  yield takeLatest(CHANGE_GIT_DIRECTORY, function* () {
    try {
      const filePaths = yield call(openDirectoryChooser, currentDir)
      yield put({ type: CHANGE_GIT_DIRECTORY_SUCCESS, directory: filePaths[0] })
    } catch (err) {
      yield put({ type: CHANGE_GIT_DIRECTORY_ERROR, err: err.message })
    }
  })
}

function getRepoNameFromUrl(inputUrl) {
    const pathname = url.parse(inputUrl).pathname
    return pathname ? pathname.substr(pathname.lastIndexOf('/') + 1) : null
}

function gitClone(url, localPath) {
  return Git.Clone.clone(url, localPath)
}

function* listenToGitClone() {
    yield takeLatest(GIT_CLONE, function* (action) {
      try {
        const {repoUrl, projectsDir} = action
        const repoName = getRepoNameFromUrl(repoUrl)
        if (!repoName) {
            throw new Error(`No pathname could be deduced from the repo url ${repoUrl}`)
        }
        const gitDir = projectsDir + '/repos/' + repoName
        yield call(gitClone, repoUrl, gitDir)
        yield put({type: GIT_CLONE_SUCCESS, dir: gitDir})
      } catch (err) {
        yield put({type: GIT_CLONE_ERROR, err: err.message})
      }
    })
}

function* listenToGitCloneSuccess() {
  yield takeLatest(GIT_CLONE_SUCCESS, function* ({dir}) {
    yield put(openProjectWindow({dir}))
    yield put(closeNewProjectWindow())
  })
}

export default function* () {
  yield [
    listenToGitClone(),
    listenToDirectoryChange(),
    listenToGitCloneSuccess(),
  ]
}
