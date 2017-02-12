
import taskWindow from './containers/TaskWindow/sagas';
import gitWindow from './containers/GitWindow/sagas';
import openDialog from './containers/OpenDialog/sagas';

export default function* () {
  yield [
    taskWindow(),
    openDialog(),
    gitWindow()
  ]
}
