// @flow strict

import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import type {Media} from '@coorpacademy/progression-engine';

import {MEDIA_TYPE} from '../const';
import theme from '../modules/theme';
import {getCleanUri} from '../modules/uri';
import ImageBackgroundScalable from '../containers/image-background-scalable';
import Html from './html';
import {BrandThemeContext} from './brand-theme-provider';

type Props = {|
  isSelected?: boolean,
  onPress: () => void,
  children: string,
  isDisabled?: boolean,
  testID?: string,
  media?: Media,
  squeezed?: boolean,
  style?: GenericStyleProp
|};

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.common,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  textContainer: {
    paddingLeft: theme.spacing.small,
    paddingRight: theme.spacing.tiny,
    paddingVertical: theme.spacing.base,
    flex: 1
  },
  squeezedTextContainer: {
    padding: theme.spacing.small,
    paddingLeft: undefined,
    paddingVertical: undefined,
    paddingRight: undefined,
    flex: 0
  },
  text: {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.black
  },
  textSelected: {
    color: theme.colors.white
  },
  unselectedImageContainer: {
    borderRightColor: theme.colors.border
  },
  imageContainer: {
    borderRightWidth: 1,
    borderColor: theme.colors.border,
    height: '100%',
    width: '25%'
  },
  image: {
    height: '100%',
    width: '100%'
  }
});

const QuestionChoice = ({
  children,
  isSelected = false,
  squeezed = false,
  isDisabled,
  onPress,
  media,
  testID: prefixTestID,
  style
}: Props) => (
  <BrandThemeContext.Consumer>
    {brandTheme => {
      const selectedStyle = {
        backgroundColor: brandTheme.colors.primary,
        borderColor: brandTheme.colors.primary
      };

      const selectedSuffix = prefixTestID && isSelected ? '-selected' : '';
      const mediaType =
        media && media.type && media.type === MEDIA_TYPE.IMAGE && media.type.toLowerCase();
      const mediaUri =
        media &&
        media.type === MEDIA_TYPE.IMAGE &&
        media.src &&
        media.src.length > 0 &&
        getCleanUri(media.src[0].url);

      const mediaSuffix = prefixTestID && mediaType ? `-${mediaType}` : '';

      return (
        <TouchableOpacity onPress={!isDisabled ? onPress : undefined} style={style}>
          <View
            style={[styles.container, isSelected && selectedStyle]}
            testID={prefixTestID && `${prefixTestID}${selectedSuffix}`}
          >
            {mediaUri && (
              <View style={[styles.imageContainer, isSelected && selectedStyle]}>
                <ImageBackgroundScalable
                  testID={prefixTestID && `${prefixTestID}${mediaSuffix}`}
                  source={{uri: mediaUri}}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}
            <View style={[styles.textContainer, squeezed && styles.squeezedTextContainer]}>
              <Html
                fontSize={squeezed ? theme.fontSize.medium : theme.fontSize.regular}
                style={[styles.text, isSelected && styles.textSelected]}
              >
                {children}
              </Html>
            </View>
          </View>
        </TouchableOpacity>
      );
    }}
  </BrandThemeContext.Consumer>
);

export default QuestionChoice;
