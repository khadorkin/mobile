// @flow

import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import theme from '../modules/theme';
import ImageBackground from './image-background';
import {BrandThemeContext} from './brand-theme-provider';

type Props = {|
  userName: string,
  backgroundImage: string
|};

const styles = StyleSheet.create({
  container: {
    maxHeight: 544,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing.tiny
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSize.xxlarge,
    fontWeight: theme.fontWeight.bold
  }
});

const Hero = ({userName, backgroundImage}: Props) => {
  return (
    <BrandThemeContext.Consumer>
      {brandTheme => {
        <ImageBackground style={styles.container} resizeMode="cover" source={backgroundImage}>
          <Text style={styles.text}> {`Bienvenue ${userName}`} </Text>
        </ImageBackground>;
      }}
    </BrandThemeContext.Consumer>
  );
};

export default Hero;
