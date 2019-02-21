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
    overflow: 'hidden'
  }
});

const Card = ({children, style, testID}: Props) => {
  return (
    <View style={[style, {flex: 1}]}>
      <View style={[styles.container]} testID={testID}>
        {children}
      </View>
    </View>
  );
};

export default Card;
