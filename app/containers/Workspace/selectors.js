
import { createSelector } from 'reselect'
import { getWindowState } from '../../selectors'

const getWorkspace = createSelector(
  getWindowState,
  state => state.workspace || {}
)

export const getDir = createSelector(
  getWorkspace,
  state => state.workingDirectory
)
