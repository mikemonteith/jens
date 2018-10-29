
import { UPDATE, STATUS_UPDATED, PATCHES_UPDATED } from './constants'

export const update = () => ({
  type: UPDATE
})

export const statusUpdated = (files) => ({
  type: STATUS_UPDATED,
  files,
})

export const patchesUpdated = (patches) => ({
  type: PATCHES_UPDATED,
  patches,
})
