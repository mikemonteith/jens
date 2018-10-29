
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

export default function* () {
  yield takeEvery(constants.UPDATE, update)
}
