// @flow strict

import * as React from 'react';
import {Text as TextBase} from 'react-native';

type Props = {|
  // copied from node_modules/react-native/Libraries/Text/TextProps.js
  children: React.Node,
  numberOfLines?: number,
  style?: GenericStyleProp,
  testID?: string
|};

const Text = ({testID, children, numberOfLines = Infinity, style}: Props) => {
  const _numberOfLines = numberOfLines && numberOfLines;
  return (
    <TextBase style={style} testID={testID} numberOfLines={_numberOfLines}>
      {children}
    </TextBase>
  );
};

export default Text;
