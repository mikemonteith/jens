import React from 'react';
import classnames from 'classnames';

import connect from '../../connect';
import * as actions from './actions';
import * as constants from './constants';

require('./style.scss');

class ContextSwitcher extends React.Component {

  render() {
    const activeTab = this.props.contextSwitcher.tab
    const onClickTab = this.props.onClickTab

    const Button = (props) => (
      <span
        className={classnames('context-switcher_button', {
          active: activeTab === props.tabKey
        })}
        onClick={() => onClickTab(props.tabKey)}
      >{props.children}</span>
    )

    return (
      <div className={classnames('context-switcher')}>
        <Button tabKey={constants.TASKS}>TASKS</Button>
        <Button tabKey={constants.FILES}>FILES</Button>
        <Button tabKey={constants.GIT}>GIT</Button>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    contextSwitcher: state.contextSwitcher,
  }),
  (dispatch) => ({
    onClickTab: (key) => dispatch(actions.selectTab(key)),
  }),
)(ContextSwitcher);
