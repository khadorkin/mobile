import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  NovaCompositionCoorpacademyAdaptive,
  NovaCompositionCoorpacademyTimer,
  NovaSolidStatusCheckCircle2,
} from '@coorpacademy/nova-icons';

import {getExternalContentColor, isExternalContent} from '../utils';
import {CONTENT_TYPE, AUTHOR_TYPE, SPACE} from '../const';
import type {ExternalContentCard, Card} from '../layer/data/_types';

import {getAuthor} from '../utils/content';
import theme from '../modules/theme';
import translations from '../translations';
import Text from './text';
import ProgressionBar from './progression-bar';
import Placeholder from './placeholder';
import PlaceholderLine, {
  LARGE_HEIGHT as PLACEHOLDER_LARGE_HEIGHT,
  BASE_HEIGHT as PLACEHOLDER_BASE_HEIGHT,
  SMALL_HEIGHT as PLACEHOLDER_SMALL_HEIGHT,
  TINY_HEIGHT as PLACEHOLDER_TINY_HEIGHT,
} from './placeholder-line';
import Space from './space';

interface Props {
  item?: Card;
  testID: string;
  size?: 'cover' | 'hero';
}

export const PLACEHOLDER_COLOR = theme.colors.gray.lightMedium;
export const PLACEHOLDER_COLOR_SCORM = theme.colors.gray.dark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: theme.spacing.small,
  },
  containerScorm: {
    justifyContent: 'space-between',
  },
  black: {
    color: theme.colors.black,
  },
  icons: {
    flexDirection: 'row',
  },
  textCentered: {
    textAlign: 'center',
  },
  externalContentType: {
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.small,
  },
  title: {
    color: theme.colors.white,
    fontWeight: theme.fontWeight.bold,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  subtitle: {
    flex: 1,
    color: theme.colors.white,
    fontWeight: theme.fontWeight.regular,
  },
  progressionBar: {
    borderRadius: theme.radius.common,
    overflow: 'hidden',
  },
  progressionBarCentered: {
    width: '60%',
    alignSelf: 'center',
  },
  placeholder: {
    // @todo to be removed once we got a proper placeholder-line component
    height:
      PLACEHOLDER_BASE_HEIGHT +
      theme.spacing.tiny +
      PLACEHOLDER_BASE_HEIGHT +
      theme.spacing.base +
      PLACEHOLDER_SMALL_HEIGHT +
      theme.spacing.small +
      PLACEHOLDER_TINY_HEIGHT,
  },
  placeholderHero: {
    // @todo to be removed once we got a proper placeholder-line component
    height:
      PLACEHOLDER_LARGE_HEIGHT +
      theme.spacing.tiny +
      PLACEHOLDER_LARGE_HEIGHT +
      theme.spacing.base +
      PLACEHOLDER_SMALL_HEIGHT +
      theme.spacing.small +
      PLACEHOLDER_TINY_HEIGHT,
  },
});

const getCompletion = (item: Card) => {
  // If a course(even the adaptives ones) have more than a level
  // we want to show users' progressions for each one of them.
  if (item.type === 'course' && item.modules?.length > 1) {
    return item.completion;
  }
  // otherwise we just alternate between 0 & 1 if it's an adaptive chapter
  // or we show the real completion if it's not.
  return item.adaptiv && item.completion < 1 ? 0 : item.completion;
};

const CatalogItemFooter = ({item, testID, size}: Props) => {
  const isHero = size === 'hero';
  const isExternal = isExternalContent(item);

  if (!item) {
    return (
      <View style={styles.container} testID={`${testID}-placeholder`}>
        <Placeholder style={[styles.placeholder, isHero && styles.placeholderHero]}>
          <PlaceholderLine
            size={(isHero && 'large') || 'base'}
            width={(isHero && 85) || 65}
            color={PLACEHOLDER_COLOR}
            isCentered={isHero}
          />
          <Space type={SPACE.TINY} />
          <PlaceholderLine
            size={(isHero && 'large') || 'base'}
            width={(isHero && 65) || 90}
            color={PLACEHOLDER_COLOR}
            isCentered={isHero}
          />
          <Space type={SPACE.BASE} />
          <PlaceholderLine size="small" width={50} color={PLACEHOLDER_COLOR} isCentered={isHero} />
          <Space type={SPACE.SMALL} />
          <View style={[styles.progressionBar, isHero && styles.progressionBarCentered]}>
            <PlaceholderLine
              size="tiny"
              width={100}
              color={PLACEHOLDER_COLOR}
              isCentered={isHero}
            />
          </View>
        </Placeholder>
      </View>
    );
  }

  const titleFontSize =
    (size && (size === 'hero' ? theme.fontSize.xxlarge : theme.fontSize.xlarge)) ||
    theme.fontSize.regular;
  const subtitleFontSize = (size && theme.fontSize.regular) || theme.fontSize.small;
  const topIconSize = titleFontSize;
  const iconCertifiedSize = subtitleFontSize * 1.1;

  const author = getAuthor(item);
  const subtitle =
    item.authors &&
    item.authors
      .filter(({label}) => label)
      .map(({label}) => label)
      .join(', ');
  const titleStyle = {fontSize: titleFontSize};
  const subtitleStyle = {fontSize: subtitleFontSize};

  const itemCompletion = getCompletion(item);

  return (
    <View style={[styles.container, isExternal ? styles.containerScorm : null]} testID={testID}>
      <View>
        <View style={styles.icons}>
          {!isHero && item.type === CONTENT_TYPE.CHAPTER ? (
            <React.Fragment>
              <NovaCompositionCoorpacademyTimer
                testID={`infinite-${testID}`}
                color={theme.colors.white}
                height={topIconSize}
                width={topIconSize}
              />
              <Space />
            </React.Fragment>
          ) : null}
          {!isHero && item.adaptiv ? (
            <NovaCompositionCoorpacademyAdaptive
              testID={`infinite-${testID}`}
              color={!isExternal ? theme.colors.white : theme.colors.black}
              height={topIconSize}
              width={topIconSize}
            />
          ) : null}
        </View>
        <Space type="micro" />
        {isExternal ? (
          <React.Fragment>
            <Text
              style={[
                styles.externalContentType,
                {color: getExternalContentColor((item as ExternalContentCard)?.type)},
              ]}
            >
              {translations[item.type].toUpperCase()}
            </Text>
            <Space type="tiny" />
          </React.Fragment>
        ) : null}

        <Text
          numberOfLines={4}
          testID={`title-${testID}`}
          style={[
            styles.title,
            titleStyle,
            isHero && styles.textCentered,
            isExternal && styles.black,
          ]}
        >
          {item.title}
        </Text>
        {subtitle ? (
          <React.Fragment>
            <Space type="tiny" />
            <View style={styles.subtitleContainer}>
              <Text
                numberOfLines={1}
                testID={`subtitle-${testID}`}
                style={[
                  styles.subtitle,
                  subtitleStyle,
                  isHero && styles.textCentered,
                  isExternal && styles.black,
                ]}
              >
                {subtitle}
              </Text>
              {author && author.authorType === AUTHOR_TYPE.VERIFIED && size !== 'hero' ? (
                <React.Fragment>
                  <Space type="tiny" />
                  <NovaSolidStatusCheckCircle2
                    testID={`certified-${testID}`}
                    color={!isExternal ? theme.colors.white : theme.colors.black}
                    height={iconCertifiedSize}
                    width={iconCertifiedSize}
                  />
                </React.Fragment>
              ) : null}
            </View>
          </React.Fragment>
        ) : null}
        <Space type="small" />
      </View>
      <View
        style={[styles.progressionBar, isHero && styles.progressionBarCentered]}
        testID={`progress-bar-${testID}`}
      >
        <ProgressionBar
          current={itemCompletion}
          total={1}
          height={isHero ? 3 : 2}
          backgroundColor={theme.colors.gray.light}
          isInnerRounded
        />
      </View>
    </View>
  );
};

export default CatalogItemFooter;
