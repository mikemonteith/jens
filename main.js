import { app } from 'electron'
import { INIT_WINDOWS } from 'redux-electron-windows'
import * as ElectronDevtoolsInstaller from 'electron-devtools-installer'

import * as settingsActions from './app/containers/Settings/actions'

function installDevTools() {
  ElectronDevtoolsInstaller.default(ElectronDevtoolsInstaller.REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  ElectronDevtoolsInstaller.default(ElectronDevtoolsInstaller.REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
}

import createStore from './store'

let store

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  if( process.env.NODE_ENV !== 'production' ) {
    installDevTools()
  }
  store = createStore(() => {
    store.dispatch(settingsActions.initSettings())
    store.dispatch({ type: INIT_WINDOWS })
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  store.dispatch({ type: INIT_WINDOWS })
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
