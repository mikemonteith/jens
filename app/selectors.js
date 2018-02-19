import querystring from 'querystring'

const params = querystring.parse(global.location.search.substring(1))
const { windowId } = params

export const getWindowState = state => state.windows[windowId]
