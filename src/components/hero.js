// @flow

import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import theme from '../modules/theme';
import ImageBackground from './image-background';
import {BrandThemeContext} from './brand-theme-provider';
import {UserContext} from './user-provider';

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

const Hero = () => {
  return (
    <UserContext.Consumer>
      {user => {
        <BrandThemeContext.Consumer>
          {brandTheme => {
            <ImageBackground style={styles.container} resizeMode="cover" source={brandTheme.hero}>
              <Text style={styles.text}> {`Bienvenue ${user.givenName}`} </Text>
            </ImageBackground>;
          }}
        </BrandThemeContext.Consumer>;
      }}
    </UserContext.Consumer>
  );
};

export default Hero;
