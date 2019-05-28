// @flow

import * as React from 'react';
import PlaceholderBase from 'rn-placeholder';

type Props = {|
  children: React.Node,
  isAnimated?: boolean
|};

const Placeholder = ({children, isAnimated, style}: Props) => (
  <PlaceholderBase animation={isAnimated && 'fade'}>{children}</PlaceholderBase>
);

export default Placeholder;
