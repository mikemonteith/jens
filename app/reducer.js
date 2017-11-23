
import contextSwitcher from './containers/ContextSwitcher/reducer'
import gitWindow from './containers/GitWindow/reducer'
import taskWindow from './containers/TaskWindow/reducer'
import newProject from './containers/NewProject/reducer'
import openDialog from './containers/OpenDialog/reducer'
import workspace from './containers/Workspace/reducer'

import { combineReducers } from 'redux'

export default combineReducers({
  contextSwitcher,
  git: gitWindow,
  tasks: taskWindow,
  newProject,
  openDialog,
  workspace,

  // pass through the state that is run on the main thread
  // so that windows can access it's properties
  main: (state = {}) => state,
});
