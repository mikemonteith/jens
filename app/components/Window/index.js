import React from 'react'
import classnames from 'classnames'

require('./style.scss')

const Window = (props) => (
  <div
    {...props}
    className={classnames('window', props.className)}
  />
)

export default Window
