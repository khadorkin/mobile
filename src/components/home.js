// @flow

import * as React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

import type {DisciplineCard, ChapterCard} from '../layer/data/_types';
import Catalog from '../containers/catalog';
import RoundedFooterAnimated from '../containers/rounded-footer-animated';
import {ANIMATION_TYPE} from '../const';
import theme from '../modules/theme';
import {BrandThemeContext} from './brand-theme-provider';
import Version from './version';
import Gradient from './gradient';
import Touchable from './touchable';

type Props = {|
  onCardPress: (item: DisciplineCard | ChapterCard) => void,
  onLogoLongPress: () => void,
  isFetching?: boolean
|};

const LOGO_HEIGHT = 35;
const HEADER_HEIGHT = LOGO_HEIGHT + theme.spacing.small * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: HEADER_HEIGHT
  },
  header: {
    position: 'absolute',
    paddingVertical: theme.spacing.small,
    backgroundColor: theme.colors.white,
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT
  },
  logo: {
    height: LOGO_HEIGHT,
    width: '100%'
  },
  gradient: {
    position: 'absolute',
    left: 0,
    top: 0,
    paddingTop: HEADER_HEIGHT,
    right: 0
  },
  version: {
    color: theme.colors.white,
    paddingBottom: theme.spacing.base
  }
});

const Home = ({onCardPress, onLogoLongPress, isFetching}: Props) => (
  <View style={styles.container} testID="home">
    <BrandThemeContext.Consumer>
      {brandTheme => (
        <React.Fragment>
          {!isFetching && (
            <RoundedFooterAnimated
              color={brandTheme.colors.primary}
              testID="home-footer"
              animationType={ANIMATION_TYPE.IN}
            />
          )}
          <Catalog onPress={onCardPress}>
            <Version style={styles.version} />
          </Catalog>
          <Gradient
            height={HEADER_HEIGHT + theme.spacing.small}
            colors={[theme.colors.white]}
            transparencyPosition="bottom"
            style={styles.gradient}
          />
          {!isFetching && (
            <View style={styles.header}>
              <Touchable
                testID="home-logo"
                onLongPress={onLogoLongPress}
                analyticsID="sign-out"
                isWithoutFeedback
              >
                <ImageBackground
                  style={styles.logo}
                  testID="brand-logo"
                  source={{uri: brandTheme.images['logo-mobile']}}
                  resizeMode="contain"
                />
              </Touchable>
            </View>
          )}
        </React.Fragment>
      )}
    </BrandThemeContext.Consumer>
  </View>
);

export default Home;
