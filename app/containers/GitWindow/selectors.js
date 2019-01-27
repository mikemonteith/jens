
export const selectFileStatus = state => {
  return state.git.status.files
}

export const selectPatches = state => {
  return state.git.patches
}
