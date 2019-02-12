// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {getCurrentProgression, getLives} from '@coorpacademy/player-store';

import HeaderSlideRightComponent from '../components/header-slide-right';
import type {StoreState} from '../redux/store';

type ConnectedStateProps = {|
  count?: number
|};

type Props = {|
  ...ConnectedStateProps
|};

// react-navigation needs this to be a class
// eslint-disable-next-line react/prefer-stateless-function
class HeaderSlideRight extends React.Component<Props> {
  props: Props;

  render() {
    const {count} = this.props;

    if (count === undefined) {
      return null;
    }

    return <HeaderSlideRightComponent count={count} />;
  }
}

const mapStateToProps = (state: StoreState): ConnectedStateProps => {
  const progression = getCurrentProgression(state);
  if (!progression) {
    return {count: 0};
  }
  return {
    count: getLives(state) || 0
  };
};

export default connect(mapStateToProps)(HeaderSlideRight);
