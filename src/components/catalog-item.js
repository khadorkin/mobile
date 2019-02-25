// @flow

import * as React from 'react';
import {TouchableHighlight} from 'react-native';
import type {Progression, DisplayMode} from '../types';
import {DISPLAY_MODE} from '../const';
import theme from '../modules/theme';
import type {Chapter, Discipline} from '../layer/data/_types';
import CatalogItemFooter from './catalog-item-footer';
import Badge from './catalog-item-badge';
import ImageGradient from './image-gradient';
import CatalogItemAuthor from './catalog-item-author';

export type Item = Discipline | Chapter;

type Props = {|
  title: string,
  subtitle: string,
  progression?: Progression,
  onPress: (item: Item) => void,
  image: File | {uri: string},
  badge?: string,
  authorType?: string,
  isAdaptive: boolean,
  isCertified?: boolean,
  displayMode?: DisplayMode,
  testID: string
|};

const CatalogItem = ({
  onPress,
  title,
  subtitle,
  progression,
  image,
  badge,
  isAdaptive,
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
      <ImageGradient
        testID={testID}
        image={image}
        style={{padding: currentStyle.paddingGradient}}
        minHeight={currentStyle.minHeight}
      >
        {badgeLabel && (
          <Badge
            label={badgeLabel}
            minWidth={currentStyle.minWidth}
            minHeight={currentStyle.minHeight}
            fontSize={currentStyle.badgeFontSize}
            testID={`badge-${testID}`}
          />
        )}
        {authorType && (
          <CatalogItemAuthor
            authorType={authorType}
            fontSize={currentStyle.authorSize}
            testID={testID}
          />
        )}
        <CatalogItemFooter
          title={title}
          subtitle={subtitle}
          isCertified={isCertified}
          isAdaptive={isAdaptive}
          progression={progression}
          testID={testID}
        />
      </ImageGradient>
    </TouchableHighlight>
  );
};

export default CatalogItem;
