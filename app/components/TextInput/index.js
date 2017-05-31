import React from 'react'
import classnames from 'classnames'

require('./style.scss')

export default class TextInput extends React.Component {
  render() {
    const { error, ...rest } = this.props

    return (
      <div>
        <input
          {...rest}
          type='text'
          className={classnames('text-input', this.props.className, {
            'text-input--disabled': !!this.props.disabled,
            'text-input--error': !!error,
          })}
        />
        { error && (<span className='text-input__error-message'>{error}</span>)}
      </div>
    );
  }
}
