
import { UPDATE, STATUS_UPDATED } from './constants'

export const update = () => ({
  type: UPDATE
})

export const statusUpdated = (files) => ({
  type: STATUS_UPDATED,
  files
})