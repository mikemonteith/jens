import { spawn } from 'child_process'
import EventEmitter from 'events'

export default (taskName) => {
  console.log("running task", taskName)
  const emitter = new EventEmitter();
  const run = spawn('./node_modules/.bin/npm', ['run', taskName])

  run.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    emitter.emit('message', data)
  });

  run.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
    emitter.emit('error', data)
  });

  run.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    emitter.emit('end')
  });

  return emitter
}
