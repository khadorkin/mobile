// @flow

import * as React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {
  NovaCompositionCoorpacademyAdaptive,
  NovaSolidStatusCheckCircle2
} from '@coorpacademy/nova-icons';
import LinearGradient from 'react-native-linear-gradient';
import type {Progression} from '../types';
import theme from '../modules/theme';
import Text from './text';
import ProgressionBar from './progression-bar';
import {BrandThemeContext} from './brand-theme-provider';

type Props = {|
  title: string,
  subtitle: string,
  progression: Progression,
  image: File | {uri: string},
  badge?: string,
  editor?: string,
  isInfinite: boolean,
  isCertified?: boolean,
  editorFontSize?: number,
  titleFontSize?: number,
  subtitleFontSize?: number,
  progressionBarHeight?: number
|};

const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: theme.spacing.small
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  editorContainer: {
    position: 'absolute',
    margin: theme.spacing.small + theme.spacing.micro,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  editor: {
    color: theme.colors.white,
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowRadius: 4
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
    borderBottomEndRadius: theme.radius.medium
  },
  badge: {
    fontSize: 11,
    padding: theme.spacing.micro,
    paddingLeft: theme.spacing.tiny,
    paddingRight: theme.spacing.tiny + theme.spacing.micro,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center'
  }
});

const Item = ({
  title,
  subtitle,
  progression,
  image,
  badge,
  isInfinite,
  editor,
  isCertified,
  editorFontSize,
  titleFontSize,
  subtitleFontSize,
  progressionBarHeight
}: Props) => {
  const titleSize = titleFontSize ? titleFontSize : 16;
  const subtitleSize = subtitleFontSize ? subtitleFontSize : 14;
  const progressBarHeight = progressionBarHeight ? progressionBarHeight : 5;
  const editorSize = editorFontSize ? editorFontSize : 10;
  return (
    <BrandThemeContext.Consumer>
      {brandTheme => (
        <ImageBackground testID="image-background" source={image} style={styles.image}>
          <LinearGradient
            testID="gradient"
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
            style={styles.container}
          >
            {badge && (
              <View style={styles.badgeContainer}>
                <Text
                  testID={`badge-${badge}`}
                  style={[styles.badge, {color: brandTheme.colors.primary}]}
                >
                  {badge}
                </Text>
              </View>
            )}
            {editor === 'coorp' && (
              <View style={styles.editorContainer}>
                <Text testID="editor-coorp" style={[styles.editor, {fontSize: editorSize}]}>
                  COORP <Text style={{fontWeight: theme.fontWeight.bold}}>ORIGINAL</Text>
                </Text>
              </View>
            )}
            {editor !== 'coorp' && (
              <View style={styles.editorContainer}>
                <Text
                  testID="editor-custom"
                  style={[styles.editor, {fontSize: editorSize, fontWeight: theme.fontWeight.bold}]}
                >
                  {editor}
                </Text>
              </View>
            )}
            <View style={styles.bottomContainer}>
              {isInfinite && (
                <NovaCompositionCoorpacademyAdaptive
                  testID="infinite-icon"
                  color={theme.colors.white}
                  height={22}
                  width={22}
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
              <View style={styles.progressionBar}>
                <ProgressionBar
                  current={progression.current}
                  count={progression.count}
                  height={progressBarHeight}
                  bgBarColor={theme.colors.white}
                  isInnerRounded
                />
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      )}
    </BrandThemeContext.Consumer>
  );
};

export default Item;
