// @flow

import * as React from 'react';
import {StyleSheet, View, ImageBackground, TouchableHighlight} from 'react-native';
import {
  NovaCompositionCoorpacademyAdaptive,
  NovaSolidStatusCheckCircle2
} from '@coorpacademy/nova-icons';
import LinearGradient from 'react-native-linear-gradient';
import type {Progression, DisplayMode} from '../types';
import {DISPLAY_MODE} from '../const';
import theme from '../modules/theme';
import type {Chapter, Discipline} from '../layer/data/_types';
import Text from './text';
import ProgressionBar from './progression-bar';
import {BrandThemeContext} from './brand-theme-provider';

export type Item = Discipline | Chapter;

type Props = {|
  title: string,
  subtitle: string,
  progression?: Progression,
  onPress: (item: Item) => void,
  image: File | {uri: string},
  badge?: string,
  authorType?: string,
  isInfinite: boolean,
  isCertified?: boolean,
  displayMode?: DisplayMode,
  testID: string
|};

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  content: {
    flex: 1
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
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
  },
  title: {
    color: theme.colors.white,
    fontWeight: theme.fontWeight.bold,
    paddingTop: theme.spacing.tiny
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  subtitle: {
    color: theme.colors.white,
    fontWeight: theme.fontWeight.regular,
    paddingBottom: theme.spacing.small,
    paddingTop: theme.spacing.tiny
  },
  certified: {
    paddingLeft: theme.spacing.tiny,
    marginTop: -5
  },
  progressionBar: {
    borderRadius: theme.radius.common,
    overflow: 'hidden'
  },
  badgeContainer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
    borderBottomEndRadius: theme.radius.medium,
    height: 19
  },
  badge: {
    fontSize: 8,
    padding: theme.spacing.micro,
    paddingLeft: theme.spacing.tiny,
    paddingRight: theme.spacing.tiny + theme.spacing.micro,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center'
  }
});

const CatalogItem = ({
  onPress,
  title,
  subtitle,
  progression,
  image,
  badge,
  isInfinite,
  authorType,
  isCertified,
  displayMode,
  testID
}: Props) => {
  const mode: DisplayMode = displayMode ? displayMode : DISPLAY_MODE.COVER;

  const cardStyle: GenericStyleProp = {
    titleSize: 16,
    subtitleSize: 14,
    progressBarHeight: 2,
    authorSize: 8,
    paddingGradient: theme.spacing.small,
    badgeW: 40,
    badgeH: 17,
    badgeFontSize: 8,
    minHeight: 205
  };

  const coverStyle: GenericStyleProp = {
    titleSize: 22,
    subtitleSize: 16,
    progressBarHeight: 2,
    authorSize: 12,
    paddingGradient: theme.spacing.base,
    badgeW: 45,
    badgeH: 20,
    badgeFontSize: 11,
    minHeight: 265
  };

  let currentStyle: GenericStyleProp;
  switch (mode) {
    case DISPLAY_MODE.CARD:
      currentStyle = cardStyle;
      break;
    case DISPLAY_MODE.COVER:
      currentStyle = coverStyle;
      break;
    default:
      currentStyle = cardStyle;
  }

  const badgeLabel =
    badge && badge !== '' ? badge.charAt(0).toUpperCase() + badge.slice(1) : undefined;

  return (
    <TouchableHighlight testID={testID} onPress={onPress}>
      <ImageBackground
        testID={`background-image-${testID}`}
        source={image}
        style={[styles.background, {minHeight: currentStyle.minHeight}]}
      >
        <LinearGradient
          testID={`gradient-${testID}`}
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
          style={[styles.content, {padding: currentStyle.paddingGradient}]}
        >
          {badgeLabel && (
            <View style={styles.badgeContainer}>
              <BrandThemeContext.Consumer>
                {brandTheme => (
                  <Text
                    testID={`badge-${testID}`}
                    style={[
                      styles.badge,
                      {
                        minWidth: currentStyle.badgeW,
                        minHeight: currentStyle.badgeH,
                        fontSize: currentStyle.badgeFontSize,
                        color: brandTheme.colors.primary
                      }
                    ]}
                  >
                    {badgeLabel}
                  </Text>
                )}
              </BrandThemeContext.Consumer>
            </View>
          )}
          {authorType === 'coorp' && (
            <View style={styles.authorContainer}>
              <Text
                testID={`author-${testID}`}
                style={[styles.author, {fontSize: currentStyle.fontSize}]}
              >
                COORP <Text style={{fontWeight: theme.fontWeight.bold}}>ORIGINAL</Text>
              </Text>
            </View>
          )}
          {authorType !== 'coorp' && (
            <View style={styles.authorContainer}>
              <Text
                testID={`author-${testID}`}
                style={[
                  styles.author,
                  {fontSize: currentStyle.authorSize, fontWeight: theme.fontWeight.bold}
                ]}
              >
                {authorType && authorType.toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.bottomContainer}>
            {isInfinite && (
              <NovaCompositionCoorpacademyAdaptive
                testID={`infinite-${testID}`}
                color={theme.colors.white}
                height={currentStyle.titleSize}
                width={currentStyle.titleSize}
              />
            )}
            <Text
              testID={`title-${testID}`}
              style={[styles.title, {fontSize: currentStyle.titleSize}]}
            >
              {title}
            </Text>
            <View style={styles.subtitleContainer}>
              <Text
                testID={`subtitle-${testID}`}
                style={[styles.subtitle, {fontSize: currentStyle.subtitleSize}]}
              >
                {subtitle}
              </Text>
              {isCertified && (
                <View style={styles.certified}>
                  <NovaSolidStatusCheckCircle2
                    testID={`certified-${testID}`}
                    color={theme.colors.white}
                    height={currentStyle.subtitleSize}
                    width={currentStyle.subtitleSize}
                  />
                </View>
              )}
            </View>
            {progression && (
              <View style={styles.progressionBar} testID={`progressBar-${testID}`}>
                <ProgressionBar
                  current={progression.current}
                  count={progression.count}
                  height={currentStyle.progressBarHeight}
                  bgBarColor={theme.colors.white}
                  isInnerRounded
                />
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableHighlight>
  );
};

export default CatalogItem;
