import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';
import * as constants from './constants';

class ContextSwitcher extends React.Component {
  render() {
    console.log(this.props.contextSwitcher);
    return (
      <div>
        <span onClick={() => this.props.onClickTab(constants.TASKS)}>TASKS</span>
        <span onClick={() => this.props.onClickTab(constants.FILES)}>FILES</span>
        <span onClick={() => this.props.onClickTab(constants.GIT)}>GIT</span>
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
