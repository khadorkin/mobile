// @flow

import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import theme from '../modules/theme';
import Text from './text';

type Props = {|
  authorType: string,
  testID: string,
  fontSize: number
|};

const styles = StyleSheet.create({
  authorContainer: {
    position: 'absolute',
    margin: theme.spacing.small + theme.spacing.micro,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  author: {
    color: theme.colors.white,
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowRadius: 2
  }
});

const CatalogItemAuthor = ({authorType, fontSize, testID}: Props) => {
  if (authorType === 'coorp') {
    return (
      <View style={styles.authorContainer}>
        <Text testID={`author-${testID}`} style={[styles.author, {fontSize: fontSize}]}>
          COORP <Text style={{fontWeight: theme.fontWeight.bold}}>ORIGINAL</Text>
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.authorContainer}>
        <Text
          testID={`author-${testID}`}
          style={[styles.author, {fontSize: fontSize, fontWeight: theme.fontWeight.bold}]}
        >
          {authorType && authorType.toUpperCase()}
        </Text>
      </View>
    );
  }
};

export default CatalogItemAuthor;
