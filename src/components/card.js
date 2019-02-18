// @flow

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import theme from '../modules/theme';
import {STYLE as BOX_STYLE} from './box';

export type Props = {|
  children: React.Node,
  style?: GenericStyleProp,
  testID?: string,
  hasShadow?: boolean
|};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.white
  },
  shadow: {
    ...BOX_STYLE,
    borderRadius: theme.radius.card,
    borderBottomWidth: 1,
    borderColor: 'rgba(20, 23, 26, 0.15)',
    backgroundColor: theme.colors.white
  }
});

const Card = ({children, style, testID, hasShadow}: Props) => {
  return (
    <View style={[styles.container, style, hasShadow && styles.shadow]} testID={testID}>
      {children}
    </View>
  );
};

export default Card;
