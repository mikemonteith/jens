import React from 'react'
import classnames from 'classnames'

require('./style.scss')

const Window = (props) => {
  const { expanded, padding, ...rest } = props
  return (
    <div
      {...rest}
      className={classnames('window', rest.className, {
        'window--expanded': expanded,
      })}
      style={{ ...rest.style, padding: padding }}
    />
  )
}

export default Window
