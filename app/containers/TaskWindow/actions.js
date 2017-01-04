
import { spawn } from 'child_process'


export const runTask = (taskName) => {
  const run = spawn('./node_modules/.bin/npm', ['run', taskName])

  run.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  run.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  run.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

}
