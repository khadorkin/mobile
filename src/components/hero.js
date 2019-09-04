// @flow

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import ImageBackground from './image-background';

type Props = {|
  userName: string,
  backGroundImage: string
|};

const styles = StyleSheet.create({
  container: {}
});

const Hero = ({userName, backGroundImage}: Props) => (
  <View style={styles.container}>
    <ImageBackground resizeMode="cover" source={backGroundImage} />
    {`Bienvenue ${userName}`}
  </View>
);

export default Hero;
