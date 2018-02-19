
export default (properReducer, mockState) => {
  return (state, action) => {
    if( action.type === 'persist/PERSIST') {
      // If we are persisting, return a mocked state
      return properReducer(mockState, action)
    } else {
      return properReducer({ ...state }, action)
    }
  }
}
