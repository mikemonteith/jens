import React from 'react'
import classnames from 'classnames'

require('./style.scss')

export default class TextInput extends React.Component {
  render() {
    const { error, className, ...rest } = this.props

    return (
      <div className={className}>
        <input
          {...rest}
          type='text'
          className={classnames('text-input', {
            'text-input--disabled': !!this.props.disabled,
            'text-input--error': !!error,
          })}
        />
        <span className='text-input__error-message'>
          {error || '\u00a0' /* nbsp */}
        </span>
      </div>
    );
  }
}
