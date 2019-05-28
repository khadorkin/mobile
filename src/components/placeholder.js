// @flow

import * as React from 'react';

import Placeholder from 'rn-placeholder';

type Props = {|
  isReady: boolean,
  children: React.Node,
  onLoading: () => React.Node,
  isAnimated?: boolean
|};

class Placholder extends React.PureComponent<Props> {
  props: Props;

  renderChildren = () => this.props.children;

  render() {
    const {isReady, onLoading, isAnimated = false} = this.props;
    const animation = isAnimated ? 'fade' : undefined;
    return (
      <Placeholder animation={animation} isReady={isReady} whenReadyRender={this.renderChildren}>
        {onLoading()}
      </Placeholder>
    );
  }
}

export default Placholder;
