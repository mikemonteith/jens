
import * as constants from './constants'

export const runTask = (taskName) => ({
  type: constants.START,
  taskName,
})
