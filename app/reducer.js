
import contextSwitcher from './containers/ContextSwitcher/reducer';
import taskWindow from './containers/TaskWindow/reducer';

import { combineReducers } from 'redux'

export default combineReducers({
  contextSwitcher,
  tasks: taskWindow,
});
