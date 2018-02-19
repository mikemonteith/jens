
import workspaceReducer from './containers/Workspace/reducer'

export default (state, action) => {
  if ( state.type === 'app' ) {
    return {
      ...state,
      ...workspaceReducer(state, action)
    }
  } else if ( state.type === 'new-project' ) {
    return state
  }
}
