import { spawn } from 'child_process'
import EventEmitter from 'events'


export default class NpmUtil {
  constructor(dir) {
    if(!dir) {
      throw new Error('dir must be the first argument when creating an NpmUtil object')
    }

    this._dir = dir;
  }

  run(command) {
    const emitter = new EventEmitter();
    const process = spawn('./node_modules/.bin/npm', ['--prefix', this._dir].concat(command.split(' ')))

    process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      emitter.emit('message', data)
    })

    process.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
      emitter.emit('error', data)
    })

    process.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      emitter.emit('end', code)
    })

    return emitter;
  }

  runTask(taskName) {
    return this.run(`run ${taskName}`)
  }
}
