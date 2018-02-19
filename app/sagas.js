
import taskWindow from './containers/TaskWindow/sagas';
import gitWindow from './containers/GitWindow/sagas';
import newProject from './containers/NewProject/sagas';
import workspace from './containers/Workspace/sagas';

export default function* () {
  yield [
    taskWindow(),
    newProject(),
    gitWindow(),
    workspace(),
  ]
}
