// @flow

import * as React from 'react';
import {Placeholder as PlaceholderBase} from 'rn-placeholder';

type Props = {|
  children: React.Node,
  style?: ViewStyleProp
|};

const Placeholder = ({children, style}: Props) => (
  <PlaceholderBase style={style}>{children}</PlaceholderBase>
);

export default Placeholder;
