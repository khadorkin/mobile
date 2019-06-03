// @flow

import * as React from 'react';
import PlaceholderBase from 'rn-placeholder';

type Props = {|
  children: React.Node,
  style?: GenericStyleProp
|};

const Placeholder = ({children, style}: Props) => (
  <PlaceholderBase animation="fade" style={style}>
    {children}
  </PlaceholderBase>
);

export default Placeholder;
