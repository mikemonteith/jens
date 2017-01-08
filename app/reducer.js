
import contextSwitcher from './containers/ContextSwitcher/reducer';
import taskWindow from './containers/TaskWindow/reducer';
import openDialog from './containers/OpenDialog/reducer';

import { combineReducers } from 'redux'

export default combineReducers({
  contextSwitcher,
  tasks: taskWindow,
  openDialog,
});
