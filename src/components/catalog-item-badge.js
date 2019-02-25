// @flow

import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import theme from '../modules/theme';
import type {Chapter, Discipline} from '../layer/data/_types';
import Text from './text';
import {BrandThemeContext} from './brand-theme-provider';

export type Item = Discipline | Chapter;

type Props = {|
  label: string,
  testID: string,
  minWidth?: number,
  minHeight?: number,
  fontSize?: number
|};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
    borderBottomEndRadius: theme.radius.medium,
    height: 19
  },
  badge: {
    padding: theme.spacing.micro,
    paddingLeft: theme.spacing.tiny,
    paddingRight: theme.spacing.tiny + theme.spacing.micro,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center'
  }
});

const Badge = ({label, testID, minWidth = 45, minHeight = 20, fontSize = 11}: Props) => {
  return (
    <View style={styles.container}>
      <BrandThemeContext.Consumer>
        {brandTheme => (
          <Text
            testID={testID}
            style={[
              styles.badge,
              {
                minWidth: minWidth,
                minHeight: minHeight,
                fontSize: fontSize,
                color: brandTheme.colors.primary
              }
            ]}
          >
            {label}
          </Text>
        )}
      </BrandThemeContext.Consumer>
    </View>
  );
};

export default Badge;
