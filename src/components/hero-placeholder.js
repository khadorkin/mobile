// @flow strict

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import theme from '../modules/theme';
import Placeholder from './placeholder';
import PlaceholderLine from './placeholder-line';

type Props = {|
  testID?: string
|};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray.light,
    padding: theme.spacing.small,
    height: 250,
    justifyContent: 'flex-end'
  }
});

const HeroPlaceholder = ({testID = 'hero-placeholder'}: Props) => (
  <View style={styles.container} testID={testID}>
    <Placeholder>
      <PlaceholderLine size="small" width="40%" color={theme.colors.gray.lightMedium} />
    </Placeholder>
  </View>
);

export default HeroPlaceholder;
