
import contextSwitcher from './containers/ContextSwitcher/reducer'
import gitWindow from './containers/GitWindow/reducer'
import taskWindow from './containers/TaskWindow/reducer'
import newProject from './containers/NewProject/reducer'
import openDialog from './containers/OpenDialog/reducer'

import { combineReducers } from 'redux'

export default combineReducers({
  contextSwitcher,
  git: gitWindow,
  tasks: taskWindow,
  newProject,
  openDialog,
});
