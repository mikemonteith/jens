import { Menu } from 'electron'
import { createWindowMiddleware } from 'redux-electron-windows'
import url from 'url'
import path from 'path'
import querystring from 'querystring'

export default createWindowMiddleware((win, state, id, dispatch) => {
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
    pathname: path.join(__dirname, '../../index.html'),
    protocol: 'file:',
    slashes: true,
    search: querystring.stringify({
      windowId: id,
      windowType: state.type,
    }),
  }))

  if(process.env.NODE_ENV === 'dev') {
    // Open the DevTools.
    win.webContents.openDevTools()
  }

  if (state.maximize) {
    win.maximize()
  }
})
