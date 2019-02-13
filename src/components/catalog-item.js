// @flow

import * as React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {NovaCompositionCoorpacademyAdaptive} from '@coorpacademy/nova-icons';
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
  editor: string,
  isNew: boolean,
  isInfinite: boolean
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
  title: {
    fontSize: 16,
    color: theme.colors.white,
    fontWeight: theme.fontWeight.bold,
    paddingTop: theme.spacing.tiny
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.white,
    fontWeight: theme.fontWeight.regular,
    paddingBottom: theme.spacing.small,
    paddingTop: theme.spacing.tiny
  },
  progressionBar: {
    borderRadius: theme.radius.common,
    overflow: 'hidden'
  },
  tagContainer: {
    flexDirection: 'row'
  },
  tag: {
    fontSize: 11,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.medium,
    overflow: 'hidden',
    padding: theme.spacing.micro,
    paddingLeft: theme.spacing.tiny,
    paddingRight: theme.spacing.tiny,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center'
  }
});

const Item = ({title, subtitle, progression, image, editor, isNew, isInfinite}: Props) => {
  return (
    <BrandThemeContext.Consumer>
      {brandTheme => (
        <ImageBackground source={image} style={styles.image}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
            style={styles.container}
          >
            {isNew && (
              <View style={styles.tagContainer}>
                <Text style={[styles.tag, {color: brandTheme.colors.primary}]}>New</Text>
              </View>
            )}
            <View style={styles.bottomContainer}>
              {isInfinite && (
                <NovaCompositionCoorpacademyAdaptive
                  color={theme.colors.white}
                  height={22}
                  width={22}
                />
              )}
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
              <View style={styles.progressionBar}>
                <ProgressionBar
                  current={progression.current}
                  count={progression.count}
                  height={5}
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
