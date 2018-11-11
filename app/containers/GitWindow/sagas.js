import fs from 'fs'
import path from 'path'

import * as jsdiff from 'diff'
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
  const repo = yield Git.Repository.open(repoDir)

  const statusFiles = yield repo.getStatus()
  yield put(actions.statusUpdated(statusFiles.map(getFileStatus)))


  const diff = yield Git.Diff.indexToWorkdir(repo, null, {
    // not sure why this is needed?
    flags: Git.Diff.OPTION.RECURSE_UNTRACKED_DIRS
  })

  /**
   * Extract useful information from a DiffLine object
   */
  const expandLine = line => {
    return {
      status: {
        32: 'CONTEXT',
        43: 'ADDITION',
        45: 'REMOVAL',
      }[line.origin()],
      content: line.content()
    }
  }

  /**
   * Extract useful information from a DiffHunk object
   */
  const expandHunk = hunk => {
    return hunk.lines().then(lines => {
      return {
        header: hunk.header(),
        lines: lines.map(expandLine),
      }
    })
  }

  /**
   * Turn a patch object into an object with a patch key and
   * expanded hunk data
   */
  const expandPatch = patch => {
    return patch.hunks().then(hunks => {
      return Promise.all(hunks.map(expandHunk))
    }).then(hunks => {
      return {
        lineStats: patch.lineStats(),
        newFilepath: patch.newFile().path(),
        oldFilepath: patch.oldFile().path(),
        hunks,
      }
    })
  }

  let patches = yield diff.patches()
  const expandedPatches = yield Promise.all(patches.map(expandPatch))
  yield put(actions.patchesUpdated(expandedPatches))

}

function* addFile (action) {
  const { filepath } = action
  const repoDir = yield select(getDir)
  const repo = yield Git.Repository.open(repoDir)

  const index = yield repo.refreshIndex()

  yield index.addByPath(filepath)
  yield index.write()
  yield index.writeTree()

  yield update()
}

function* checkoutHunk (action) {
  // To checkout a patch like one would with `git checkout -p`, we effectively
  // apply the patch in reverse. Overwriting a file with the deleted lines added
  // and added lines deleted.

  const { hunk, filepath } = action
  const repoDir = yield select(getDir)

  const fullFilepath = path.join(repoDir, filepath)

  fs.readFile(fullFilepath, 'utf8', (err, file) => {

    const patch = hunk.header + hunk.lines.map(line => {
      var status = {
        'CONTEXT': ' ',
        'ADDITION': '-', // We want to reverse the patch that's given by git diff
        'REMOVAL': '+', // so addition becomes - and removal becomes +
      }[line.status]
      return status + line.content
    }).join("")
    const patchedFile = jsdiff.applyPatch(file, patch)

    if(!patchedFile) {
      throw new Error(`Patch ${patch} could not be applied to ${filepath}`)
    }

    fs.writeFile(fullFilepath, patchedFile, (err) => {
      console.warn(err)
    })
  })

  yield update()
}

function* checkoutFile (action) {
  const { filepath } = action
  const repoDir = yield select(getDir)
  const repo = yield Git.Repository.open(repoDir)
  const index = yield repo.refreshIndex()

  yield Git.Checkout.index(repo, index, {
    checkoutStrategy: Git.Checkout.STRATEGY.FORCE,
    paths: filepath,
  })

  yield update()
}

export default function* () {
  yield takeEvery(constants.UPDATE, update)
  yield takeEvery(constants.ADD_FILE, addFile)
  yield takeEvery(constants.CHECKOUT_FILE, checkoutFile)
  yield takeEvery(constants.CHECKOUT_HUNK, checkoutHunk)
}
