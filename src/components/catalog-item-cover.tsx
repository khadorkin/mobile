import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import {
  NovaCompositionCoorpacademyScorm as ScormIcon,
  NovaCompositionCoorpacademyArticle as ArticleIcon,
  NovaCompositionCoorpacademyVideo as VideoIcon,
  NovaCompositionCoorpacademyMicrophone as PodcastIcon,
} from '@coorpacademy/nova-icons';

import type {Card, ExternalContentCard} from '../layer/data/_types';

import theme from '../modules/theme';
import ImageBackground from './image-background';
import {getExternalContentColor, isExternalContent} from '../utils';

const styles = StyleSheet.create({
  image: {
    backgroundColor: theme.colors.white,
  },

  imageGradient: {
    paddingTop: theme.spacing.base,
  },
  imageCoverGradient: {
    padding: theme.spacing.base,
    justifyContent: 'flex-end',
  },
  imageCoverExternalContent: {
    height: 118,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconExternalContainer: {
    backgroundColor: 'transparent',
    width: theme.spacing.xlarge,
    height: theme.spacing.xlarge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconExternalCircle: {
    position: 'absolute',
    backgroundColor: theme.colors.white,
    width: theme.spacing.xlarge,
    height: theme.spacing.xlarge,
    opacity: 0.25,
    borderRadius: theme.spacing.xlarge,
  },
  iconExternalCircleWithImage: {
    opacity: 1,
    width: theme.spacing.xlarge - theme.spacing.tiny,
    height: theme.spacing.xlarge - theme.spacing.tiny,
  },
});

type AnalyticsParams = {
  section?: string;
};

interface Props extends AnalyticsParams {
  item?: Card;
  onPress?: (arg0: Card) => void;
  size?: 'cover' | 'hero';
  testID: string;
}

const EXTERNAL_CONTENT_ICONS = {
  scorm: ScormIcon,
  article: ArticleIcon,
  video: VideoIcon,
  podcast: PodcastIcon,
};

class CatalogItemCover extends React.PureComponent<Props> {
  render() {
    const {item, testID, size, children} = this.props;

    const isLocked = item?.accessible === false;
    const isExternal = isExternalContent(item);

    if (!isExternal) {
      return (
        <ImageBackground
          testID={testID}
          source={item && {uri: item.image}}
          gradient={
            (item &&
              !isLocked && [
                'rgba(0,0,0,0)',
                'rgba(0,0,0,0.4)',
                'rgba(0,0,0,0.7)',
                'rgba(0,0,0,1)',
              ]) || ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)']
          }
          resizeMode="cover"
          style={[styles.image]}
          gradientStyle={size === 'cover' ? styles.imageCoverGradient : styles.imageGradient}
        >
          {children}
        </ImageBackground>
      );
    } else {
      const Icon = item && EXTERNAL_CONTENT_ICONS[(item as ExternalContentCard)?.type];
      const iconColor = item && getExternalContentColor((item as ExternalContentCard)?.type);
      const backgroundColor = {backgroundColor: iconColor};
      const view = (
        <View style={styles.iconExternalContainer}>
          <View
            style={[
              styles.iconExternalCircle,
              (item as ExternalContentCard)?.image ? backgroundColor : null,
            ]}
          />
          {(item as ExternalContentCard)?.image && (
            <View
              style={[
                styles.iconExternalCircle,
                styles.iconExternalCircleWithImage,
                backgroundColor,
              ]}
            />
          )}
          <Icon
            testID={testID}
            color={theme.colors.white}
            height={theme.spacing.medium}
            width={theme.spacing.medium}
          />
        </View>
      );
      return (
        <React.Fragment>
          {item?.image ? (
            <ImageBackground
              testID={testID}
              source={item && {uri: item.image}}
              resizeMode="cover"
              style={[styles.image, styles.imageCoverExternalContent, backgroundColor]}
            >
              {view}
            </ImageBackground>
          ) : (
            <View style={[styles.image, styles.imageCoverExternalContent, backgroundColor]}>
              {view}
            </View>
          )}
          {children}
        </React.Fragment>
      );
    }
  }
}

export default CatalogItemCover;