
import {
  UPDATE,
  STATUS_UPDATED,
  PATCHES_UPDATED,
  ADD_FILE,
  CHECKOUT_FILE,
  ADD_HUNK,
  CHECKOUT_HUNK,
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

export const addHunk = (hunk, filepath) => ({
  type: ADD_HUNK,
  hunk,
  filepath,
})

export const checkoutHunk = (hunk, filepath) => ({
  type: CHECKOUT_HUNK,
  hunk,
  filepath,
})
