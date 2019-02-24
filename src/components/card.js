// @flow

import * as React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import theme from '../modules/theme';

export type Props = {|
  children: React.Node,
  style?: GenericStyleProp,
  testID?: string,
  isDeckCard?: boolean
|};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: theme.radius.card
  }
});

const Card = ({children, style, testID, isDeckCard}: Props) => {
  if (isDeckCard) {
    return (
      <View
        style={[style, styles.container, Platform.OS === 'ios' && {overflow: 'hidden'}]}
        testID={testID}
      >
        <View style={[styles.container]}>{children}</View>
      </View>
    );
  } else {
    return (
      <View style={[style, styles.container]} testID={testID}>
        <View style={[styles.container, {overflow: 'hidden'}]}>{children}</View>
      </View>
    );
  }
};

export default Card;
