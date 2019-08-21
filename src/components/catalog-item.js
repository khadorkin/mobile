// @flow

import * as React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';

import type {Progression, CardDisplayMode, AuthorType, Engine} from '../types';
import {CARD_DISPLAY_MODE, ENGINE} from '../const';
import theme from '../modules/theme';
import type {Chapter, Discipline} from '../layer/data/_types';
import CatalogItemFooter from './catalog-item-footer';
import Badge from './catalog-item-badge';
import ImageBackground from './image-background';
import CatalogItemAuthor from './catalog-item-author';
import Touchable from './touchable';

export type Item = Discipline | Chapter;

type CourseInfo = {|
  title: string,
  subtitle: string,
  isAdaptive: boolean,
  progression?: Progression,
  image: {uri: string},
  badge?: string,
  authorType?: AuthorType,
  authorName?: string,
  isCertified?: boolean
|};

type AnalyticsParams = {|
  universalRef: string,
  type: Engine,
  section: string
|};

type Props = $Exact<{|
  ...CourseInfo,
  ...AnalyticsParams,
  onPress: () => void,
  displayMode?: CardDisplayMode,
  testID: string
|}>;

const {height: screenHeight} = Dimensions.get('window');

export const HEIGHT = 205;
export const WIDTH = 168;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white
  },
  image: {
    height: HEIGHT,
    width: WIDTH
  },
  imageGradient: {
    padding: theme.spacing.small
  },
  title: {
    fontSize: theme.fontSize.regular
  },
  subtitle: {
    fontSize: theme.fontSize.small
  },
  author: {
    fontSize: theme.fontSize.extraSmall,
    letterSpacing: 1.88
  },
  badge: {
    minWidth: 40,
    minHeight: 17
  },
  badgeLabel: {
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.extraSmall
  },
  imageCover: {
    minHeight: 215,
    height: screenHeight * 0.3
  },
  imageCoverGradient: {
    padding: theme.spacing.base
  },
  titleCover: {
    fontSize: theme.fontSize.xlarge
  },
  subtitleCover: {
    fontSize: theme.fontSize.regular
  },
  authorCover: {
    fontSize: theme.fontSize.small,
    letterSpacing: 2.25
  },
  badgeCover: {
    minWidth: 45,
    minHeight: 20
  },
  badgeLabelCover: {
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.small
  },
  touchableHighlight: {
    flex: 1
  }
});

const CatalogItem = ({
  onPress,
  title,
  subtitle,
  progression,
  image,
  badge,
  isAdaptive,
  authorType,
  authorName,
  isCertified,
  displayMode,
  testID,
  universalRef,
  type,
  section
}: Props) => {
  const mode: CardDisplayMode = displayMode ? displayMode : CARD_DISPLAY_MODE.COVER;
  const isCourse = type === ENGINE.LEARNER;
  const badgeLabel =
    badge && badge !== '' ? badge.charAt(0).toUpperCase() + badge.slice(1) : undefined;

  return (
    <Touchable
      testID={testID}
      onPress={onPress}
      isHighlight
      style={styles.touchableHighlight}
      analyticsID="card"
      analyticsParams={{ref: universalRef, type, section}}
    >
      <View style={styles.container}>
        <ImageBackground
          testID={`${testID}-image`}
          source={image}
          gradient={['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,1)']}
          resizeMode="cover"
          style={mode === CARD_DISPLAY_MODE.CARD ? styles.image : styles.imageCover}
          gradientStyle={
            mode === CARD_DISPLAY_MODE.CARD ? styles.imageGradient : styles.imageCoverGradient
          }
        >
          {badgeLabel && (
            <Badge
              label={badgeLabel}
              style={mode === CARD_DISPLAY_MODE.CARD ? styles.badge : styles.badgeCover}
              labelStyle={
                mode === CARD_DISPLAY_MODE.CARD ? styles.badgeLabel : styles.badgeLabelCover
              }
              testID={`${testID}-badge`}
            />
          )}
          <CatalogItemFooter
            isCourse={isCourse}
            title={title}
            subtitle={subtitle}
            isCertified={isCertified}
            isAdaptive={isAdaptive}
            progression={progression}
            titleStyle={mode === CARD_DISPLAY_MODE.CARD ? styles.title : styles.titleCover}
            subtitleStyle={mode === CARD_DISPLAY_MODE.CARD ? styles.subtitle : styles.subtitleCover}
            topIconSize={mode === CARD_DISPLAY_MODE.CARD ? 16 : 22}
            iconCertifiedSize={mode === CARD_DISPLAY_MODE.CARD ? 14 : 16}
            testID={testID}
          />
        </ImageBackground>
        {authorType && (
          <CatalogItemAuthor
            authorType={authorType}
            style={mode === CARD_DISPLAY_MODE.CARD ? styles.author : styles.authorCover}
            authorName={authorName ? authorName : ''}
            testID={testID}
          />
        )}
      </View>
    </Touchable>
  );
};

export default CatalogItem;
