// @flow

import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import theme from '../modules/theme';

export type Props = {|
  children: React.Node,
  style?: GenericStyleProp,
  testID?: string
|};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.white
  }
});

const Card = ({children, style, testID}: Props) => (
  <View style={[styles.container, style]} testID={testID}>
    {children}
  </View>
);

export default Card;
