
import taskWindow from './containers/TaskWindow/sagas';
import gitWindow from './containers/GitWindow/sagas';
import newProject from './containers/NewProject/sagas';
import openDialog from './containers/OpenDialog/sagas';
import workspace from './containers/Workspace/sagas';

export default function* () {
  yield [
    taskWindow(),
    openDialog(),
    newProject(),
    gitWindow(),
    workspace(),
  ]
}
