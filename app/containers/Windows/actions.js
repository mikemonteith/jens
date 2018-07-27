
import { OPEN_PROJECT_WINDOW, CLOSE_NEW_PROJECT_WINDOW } from './constants';

export const openProjectWindow = ({dir}) => ({
  type: OPEN_PROJECT_WINDOW,
  uid: Math.random(),
  dir,
});

export const closeNewProjectWindow = () => ({
  type: CLOSE_NEW_PROJECT_WINDOW,
})
