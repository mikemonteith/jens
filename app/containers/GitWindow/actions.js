
import {
  UPDATE,
  STATUS_UPDATED,
  PATCHES_UPDATED,
  ADD_FILE,
  CHECKOUT_FILE,
} from './constants'

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

export const addFile = (filepath) => ({
  type: ADD_FILE,
  filepath,
})

export const checkoutFile = (filepath) => ({
  type: CHECKOUT_FILE,
  filepath,
})
