import { GIT_CLONE } from './constants'

export const clone = (repoUrl, projectsDir) => ({
    type: GIT_CLONE,
    repoUrl,
    projectsDir
})
