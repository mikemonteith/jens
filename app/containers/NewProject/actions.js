import { GIT_CLONE, CHANGE_GIT_DIRECTORY } from './constants'

export const clone = (repoUrl, projectsDir) => ({
  type: GIT_CLONE,
  repoUrl,
  projectsDir
})

export const changeDirectory = () => ({
  type: CHANGE_GIT_DIRECTORY
})
