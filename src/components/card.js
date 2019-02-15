// @flow

import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import theme from '../modules/theme';
import Gradient from './gradient';
import Box from './box';

export type Props = {|
  children: React.Node,
  style?: GenericStyleProp,
  testID?: string,
  hasShadow?: boolean,
  hasMargin?: boolean
|};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.white,
    overflow: 'hidden'
  },
  containerMargin: {
    margin: theme.spacing.base
  },
  content: {
    flex: 1
  }
});

const Card = ({children, style, testID, hasShadow, hasMargin}: Props) => (
  <View>
    {hasShadow && (
      <Box>
        <View style={[styles.container, styles.containerMargin, style]} testID={testID}>
          <View style={styles.content}>{children}</View>
        </View>
      </Box>
    )}
    {!hasShadow && (
      <View style={[styles.container, style]} testID={testID}>
        <View style={styles.content}>{children}</View>
      </View>
    )}
  </View>
);

export default Card;
