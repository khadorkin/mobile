// @flow

import * as React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {
  NovaCompositionCoorpacademyAdaptive,
  NovaSolidStatusCheckCircle2
} from '@coorpacademy/nova-icons';
import LinearGradient from 'react-native-linear-gradient';
import type {Progression, DisplayMode} from '../types';
import {DISPLAY_MODE} from '../const';
import theme from '../modules/theme';
import Text from './text';
import ProgressionBar from './progression-bar';
import {BrandThemeContext} from './brand-theme-provider';

type Props = {|
  title: string,
  subtitle: string,
  progression?: Progression,
  image: File | {uri: string},
  badge?: string,
  authorType?: string,
  isInfinite: boolean,
  isCertified?: boolean,
  authorFontSize?: number,
  titleFontSize?: number,
  subtitleFontSize?: number,
  progressionBarHeight?: number,
  mode?: DisplayMode
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
  title,
  subtitle,
  progression,
  image,
  badge,
  isInfinite,
  authorType,
  isCertified,
  authorFontSize,
  titleFontSize,
  subtitleFontSize,
  progressionBarHeight,
  mode
}: Props) => {
  let titleSize,
    subtitleSize,
    progressBarHeight,
    authorSize,
    paddingGradient,
    paddingText,
    badgeW,
    badgeH,
    badgeFontSize: number;

  const displayMode: DisplayMode = mode ? mode : DISPLAY_MODE.COVER;

  switch (displayMode) {
    case DISPLAY_MODE.CARD:
      titleSize = 16;
      subtitleSize = 14;
      progressBarHeight = 2;
      authorSize = 8;
      paddingGradient = theme.spacing.small;
      badgeW = 35;
      badgeH = 16;
      badgeFontSize = 8;
      break;
    case DISPLAY_MODE.COVER:
      titleSize = 22;
      subtitleSize = 16;
      progressBarHeight = 2;
      authorSize = 12;
      paddingGradient = theme.spacing.base;
      badgeW = 41;
      badgeH = 19;
      badgeFontSize = 11;
      break;
    default:
      titleSize = 16;
      subtitleSize = 14;
      progressBarHeight = 2;
      authorSize = 5;
      paddingGradient = theme.spacing.small;
      badgeW = 35;
      badgeH = 16;
      badgeFontSize = 8;
  }
  const badgeLabel = badge && badge !== '' ? badge : undefined;
  return (
    <ImageBackground
      testID="image-background"
      source={image}
      style={[
        styles.background,
        displayMode === DISPLAY_MODE.CARD && {minHeight: 205},
        displayMode === DISPLAY_MODE.COVER && {minHeight: 265}
      ]}
    >
      <LinearGradient
        testID="gradient"
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
        style={[styles.content, {padding: paddingGradient}]}
      >
        {badgeLabel && (
          <View style={styles.badgeContainer}>
            <BrandThemeContext.Consumer>
              {brandTheme => (
                <Text
                  testID={`badge-${badge}`}
                  style={[
                    styles.badge,
                    {
                      width: badgeW,
                      height: badgeH,
                      fontSize: badgeFontSize,
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
            <Text testID="author-coorp" style={[styles.author, {fontSize: authorSize}]}>
              COORP <Text style={{fontWeight: theme.fontWeight.bold}}>ORIGINAL</Text>
            </Text>
          </View>
        )}
        {authorType !== 'coorp' && (
          <View style={styles.authorContainer}>
            <Text
              testID="author-custom"
              style={[styles.author, {fontSize: authorSize, fontWeight: theme.fontWeight.bold}]}
            >
              {authorType}
            </Text>
          </View>
        )}
        <View style={styles.bottomContainer}>
          {isInfinite && (
            <NovaCompositionCoorpacademyAdaptive
              testID="infinite-icon"
              color={theme.colors.white}
              height={titleSize}
              width={titleSize}
            />
          )}
          <Text testID="title" style={[styles.title, {fontSize: titleSize}]}>
            {title}
          </Text>
          <View style={styles.subtitleContainer}>
            <Text testID="subtitle" style={[styles.subtitle, {fontSize: subtitleSize}]}>
              {subtitle}
            </Text>
            {isCertified && (
              <View style={styles.certified}>
                <NovaSolidStatusCheckCircle2
                  testID="certified-icon"
                  color={theme.colors.white}
                  height={subtitleSize}
                  width={subtitleSize}
                />
              </View>
            )}
          </View>
          {progression && (
            <View style={styles.progressionBar}>
              <ProgressionBar
                current={progression.current}
                count={progression.count}
                height={progressBarHeight}
                bgBarColor={theme.colors.white}
                isInnerRounded
              />
            </View>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default CatalogItem;
