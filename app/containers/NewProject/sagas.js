
import Git from 'nodegit'
import url from 'url'

import { put, call, takeLatest } from 'redux-saga/effects'

import {
    GIT_CLONE,
    GIT_CLONE_SUCCESS,
    GIT_CLONE_ERROR
} from './constants'

function gitClone(url, localPath) {
    return Git.Clone.clone(url, localPath)
}

function getRepoNameFromUrl(inputUrl) {
    const pathname = url.parse(inputUrl).pathname
    return pathname ? pathname.substr(pathname.lastIndexOf('/') + 1) : null
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
        const newRepo = yield call(gitClone, repoUrl, gitDir)
        yield put({type: GIT_CLONE_SUCCESS, repo: newRepo})
      } catch (err) {
        yield put({type: GIT_CLONE_ERROR, err})
      }
    })
}

export default function* () {
  yield [
    listenToGitClone(),
  ]
}
