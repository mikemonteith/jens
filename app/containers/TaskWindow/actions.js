
import * as constants from './constants'

export const runTask = (taskName) => ({
  type: constants.START,
  taskName,
})

export const receiveTaskMessage = (msg) => ({
  type: msg.type,
  message: msg.value,
})

export const endTask = () => ({
  type: constants.END,
})
