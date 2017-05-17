import React from 'react';

export default class TextInput extends React.Component {
  render() {
    return (
      <input
        type="text"
        className="text-input"
        {...this.props}
        onChange={event => {
            this.props.onChange(event.target.value)
        }}
      />
    );
  }
}
