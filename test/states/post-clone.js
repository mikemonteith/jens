import path from 'path'

export default {
  windows: {
    appWindow: {
      type: 'app',
      workspace: {
        workingDirectory: path.join(__dirname, '../repos/jentest'),
      },
    },
  },
}
