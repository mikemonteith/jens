import { app } from 'electron'

export const LOAD_SETTINGS = 'LOAD_SETTINGS'

export const initSettings = () => ({
  type: LOAD_SETTINGS,
  settings: {
    projectsDir: app.getPath('userData'),
  },
})
