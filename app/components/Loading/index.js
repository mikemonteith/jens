import React from 'react'
import classnames from 'classnames'

require('./style.scss')

export default class TextInput extends React.Component {
  render() {
    const { progress } = this.props

    return (
      <div className={classnames("loading")}>
        <div className={classnames("loading__inner")} style={{ flexGrow: progress }}>
          <div className={classnames("loading__inner-background")}></div>
        </div>
        <div style={{ flexGrow: 100 - progress }}></div>
      </div>
    );
  }
}
