// @flow

import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import theme from '../modules/theme';
import ImageBackground from './image-background';
import {BrandThemeContext} from './brand-theme-provider';
import {UserContext} from './user-provider';

const IMAGE_HEIGHT = 544;

const styles = StyleSheet.create({
  imageStyle: {
    height: IMAGE_HEIGHT,
    marginBottom: theme.spacing.small
  },
  imageCoverGradient: {
    justifyContent: 'flex-end',
    padding: theme.spacing.tiny,
    height: IMAGE_HEIGHT,
    flex: 0
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
        return (
          <BrandThemeContext.Consumer>
            {brandTheme => {
              return (
                <ImageBackground
                  style={styles.imageStyle}
                  resizeMode="cover"
                  source={{
                    uri: brandTheme.hero
                  }}
                  gradientStyle={styles.imageCoverGradient}
                  gradient={[
                    'rgba(0,0,0,0)',
                    'rgba(0,0,0,0.4)',
                    'rgba(0,0,0,0.7)',
                    'rgba(0,0,0,1)'
                  ]}
                >
                  <Text style={styles.text}> {`Bienvenue ${user.givenName}`} </Text>
                </ImageBackground>
              );
            }}
          </BrandThemeContext.Consumer>
        );
      }}
    </UserContext.Consumer>
  );
};

export default Hero;
