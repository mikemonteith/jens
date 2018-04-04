import { BrowserWindow, Menu } from 'electron'
import url from 'url'
import path from 'path'
import querystring from 'querystring'

let registry = {}

function createWindow (config, dispatch) {
  let { type, closedCallback, id } = config
  // Create the browser window.
  let win = new BrowserWindow({width: 800, height: 600})

  let menu = Menu.buildFromTemplate([
    {},
    {
      label: 'File',
      submenu: [{
        label: 'Open...',
        click: function() {
          dispatch({type: 'OPEN_DIALOG'})
        },
      }, {
        type: "separator",
      }, {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:',
      }, {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+X',
        selector: 'redo:',
      }, {
        type: "separator",
      }, {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        selector: 'cut:',
      }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:',
      }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:',
      }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:',
      }]
    }
  ])
  Menu.setApplicationMenu(menu)

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
    search: querystring.stringify({
      windowId: id,
      windowType: type,
    }),
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('close', (e) => {
    if (!(id in registry) || registry[config.id].closing === true) {
      // The app has removed from the registry, go ahead close the window

      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
      menu = null
    } else {
      // The app hasn't removed the window, trigger callback instead of closing
      // down the window
      e.preventDefault()
      closedCallback()
    }
  })

  if (config.maximize) {
    win.maximize()
  }

  return win
}

/**
 * @module windowMiddleware
 * @desc A redux middleware to handle the orchestration of electron windows.
 */
export default ({dispatch, getState}) => next => action => {
  // Allow the action to propogate before seeing what our state is
  const returnValue = next(action)

  const state = getState()
  const target = state.windows || {}

  //loop over target and create windows that are not already in the registry
  Object.keys(target).forEach(id => {
    if(!id) {
      throw new Error("Window id is undefined")
    }

    if(id in registry) {
      // Already exists, do nothing
    } else {
      let closedCallback = () => {
        dispatch({type: 'WINDOW_CLOSED', id})
      }
      let ref = createWindow({...target[id], id, closedCallback}, dispatch)
      // add to the registry
      registry[id] = ref
    }
  })

  // loop over the registry and remove any windows that are not needed any more
  Object.keys(registry).forEach(id => {
    if (id in target) {
      // exists and is needed
    } else {
      // destroy the window
      registry[id].closing = true
      //calling close() will have no effect unless .closing is set to true
      registry[id].close()
      delete registry[id]
    }
  })

  return returnValue
}
