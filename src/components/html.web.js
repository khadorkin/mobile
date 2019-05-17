// @flow

import * as React from 'react';
import {View} from 'react-native';

type Props = {|
  children: string,
  fontSize: number,
  onLinkPress?: () => void,
  containerStyle?: GenericStyleProp,
  anchorTextColor?: string,
  imageStyle?: GenericStyleProp,
  style?: GenericStyleProp,
  testID?: string,
  isTextCentered?: boolean
|};

// @todo web
const Html = ({
  children,
  fontSize,
  containerStyle,
  imageStyle,
  style,
  onLinkPress,
  testID,
  anchorTextColor,
  isTextCentered
}: Props) => (
  <View testID={testID} style={[containerStyle, {fontSize}]}>
    {children}
  </View>
);

export default Html;
