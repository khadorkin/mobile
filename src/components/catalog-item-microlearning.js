// @flow

import * as React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {NovaCompositionCoorpacademyAdaptive} from '@coorpacademy/nova-icons';
import type {Progression, CardDisplayMode, AuthorType, Engine} from '../types';
import {CARD_DISPLAY_MODE} from '../const';
import theme from '../modules/theme';
import type {Chapter, Discipline} from '../layer/data/_types';
import CatalogItemFooter from './catalog-item-footer';
import Badge from './catalog-item-badge';
import CatalogItemAuthor from './catalog-item-author';

export type Item = Discipline | Chapter;

type CourseInfo = {|
  title: string,
  subtitle: string,
  progression?: Progression,
  image: File | {uri: string},
  badge?: string,
  authorType?: AuthorType,
  authorName?: string,
  isAdaptive: boolean,
  isCertified?: boolean
|};

type AnalyticsParams = {|
  universalRef: string,
  type: Engine,
  section: 'finishLearning' | 'forYou' | 'recommendation'
|};

type Props = $Exact<{|
  ...CourseInfo,
  ...AnalyticsParams,
  onPress: (item: Item) => void,
  displayMode?: CardDisplayMode,
  testID: string
|}>;

const styles = StyleSheet.create({
  container: {
    height: 205,
    backgroundColor: theme.colors.white
  },
  imageContainer: {
    height: 107
  },
  image: {
    flex: 1,
    height: 107,
    width: undefined
  },
  title: {
    fontSize: theme.fontSize.regular
  },
  subtitle: {
    fontSize: theme.fontSize.small
  },
  adaptiveIcon: {
    marginLeft: theme.spacing.base,
    marginBottom: theme.spacing.tiny,
    justifyContent: 'flex-end'
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
  footerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.small,
    paddingTop: theme.spacing.base
  }
});

const CatalogItemMicrolearning = ({
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

  const badgeLabel =
    badge && badge !== '' ? badge.charAt(0).toUpperCase() + badge.slice(1) : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground source={image} style={styles.image} resizeMode="cover" />
        {badgeLabel && (
          <Badge
            label={badgeLabel}
            style={mode === CARD_DISPLAY_MODE.CARD ? styles.badge : styles.badgeCover}
            labelStyle={
              mode === CARD_DISPLAY_MODE.CARD ? styles.badgeLabel : styles.badgeLabelCover
            }
            testID={`badge-${testID}`}
          />
        )}

        <View style={styles.adaptiveIcon}>
          {isAdaptive && (
            <NovaCompositionCoorpacademyAdaptive
              testID={`infinite-${testID}`}
              color={theme.colors.white}
              height={mode === CARD_DISPLAY_MODE.CARD ? 16 : 22}
              width={mode === CARD_DISPLAY_MODE.CARD ? 16 : 22}
            />
          )}
        </View>
      </View>
      <View style={styles.footerContainer}>
        <CatalogItemFooter
          isCourse={false}
          title={title}
          subtitle={subtitle}
          isCertified={isCertified}
          // Here we're passing isAdaptive={false} because we do not want to have the adaptiveIcon rendered
          // from the CatalogItemFooter since we're already doing it here in this component to fit in well
          isAdaptive={false}
          progression={progression}
          titleStyle={mode === CARD_DISPLAY_MODE.CARD ? styles.title : styles.titleCover}
          subtitleStyle={mode === CARD_DISPLAY_MODE.CARD ? styles.subtitle : styles.subtitleCover}
          iconCertifiedSize={mode === CARD_DISPLAY_MODE.CARD ? 14 : 16}
          testID={testID}
        />
      </View>
      {authorType && (
        <CatalogItemAuthor
          authorType={authorType}
          style={mode === CARD_DISPLAY_MODE.CARD ? styles.author : styles.authorCover}
          authorName={authorName ? authorName : ''}
          testID={testID}
        />
      )}
    </View>
  );
};

export default CatalogItemMicrolearning;
