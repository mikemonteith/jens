
import * as constants from './constants'

export const runTask = (taskName) => ({
  type: constants.START,
  taskName,
})

export const npmInstall = () => ({
  type: constants.NPM_INSTALL_START,
})
