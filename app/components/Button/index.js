import React from 'react'
import classnames from 'classnames'

require('./style.scss')

export default class Button extends React.Component {
  render() {
    return (
      <button
        {...this.props}
        type={undefined} //We have overidden the `type` html attribute
        className={classnames('button', this.props.className, {
          'button--secondary': this.props.type === 'secondary',
          'button--warning': this.props.type === 'warning',
          'button--disabled': !!this.props.disabled,
        })}
      />
    );
  }
}
