import { Menu } from 'electron'
import { createWindowMiddleware } from 'redux-electron-windows'
import url from 'url'
import path from 'path'
import querystring from 'querystring'

export default createWindowMiddleware((win, state, id, dispatch) => {
  let menu = Menu.buildFromTemplate([
    {
      submenu: [{
        role: 'quit',
      }],
    },
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
        role: 'undo',
      }, {
        role: 'redo',
      }, {
        type: "separator",
      }, {
        role: 'cut',
      }, {
        role: 'copy',
      }, {
        role: 'paste',
      }, {
        role: 'selectAll',
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
