
import { connect } from 'react-redux';
import { getWindowState } from './selectors'

/**
 * @module app/connect
 * @desc
 * A useful utility for connecting a slice of the state to a react component,
 * in this case we are connecting the `window` slice that belongs to the
 * current window.
*/
export default (connectStateToProps, ...args) => {
  return connect(
    (state) => {
      return connectStateToProps({
        _root: state, // Make the plain state accessible under a _root key
        ...getWindowState(state)
      })
    },
    ...args
  )
}
