
import taskWindow from './containers/TaskWindow/sagas';
import openDialog from './containers/OpenDialog/sagas';

export default function* () {
  yield [
    taskWindow(),
    openDialog(),
  ]
}
