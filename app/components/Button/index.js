import React from 'react'
import classnames from 'classnames'

require('./style.scss')

/**
 * A Button component inheriting from `<button/>`
 *
 * @example
 * <Button>Button Text</Button>
 * @param {string} [type] - A style type: `secondary` or `warning`
 * @param {boolean} [disabled] - Is the button disabled?
 */
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
