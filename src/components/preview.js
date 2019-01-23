// @flow

import * as React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {
  NovaSolidAudioAudioControlPlay as PlayIcon,
  NovaLineFilesOfficeFileOfficePdf as PDFIcon
} from '@coorpacademy/nova-icons';
import type {ResourceType} from '../types';
import {RESSOURCE_TYPE} from '../const';
import theme from '../modules/theme';
import Button from './button';
import Space from './space';

// NovaLineFilesOfficeFileOfficePdf

type Props = {|
  type: ResourceType,
  source: File | {uri: string},
  onButtonPress: () => void
|};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, .6)'
  },
  controlContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    padding: theme.spacing.base
  },
  icon: {
    alignSelf: 'center'
  }
});

const Preview = ({type, source, onButtonPress}: Props) => (
  <ImageBackground source={source} style={styles.image}>
    <View style={styles.overlay} />
    {type === RESSOURCE_TYPE.VIDEO ? (
      <PlayIcon style={styles.icon} color={theme.colors.white} height={70} width={70} />
    ) : (
      <View style={styles.controlContainer}>
        <PDFIcon style={styles.icon} color={theme.colors.white} height={70} width={70} />
        <Space type="base" />
        <Button isInverted onPress={onButtonPress}>
          Open
        </Button>
      </View>
    )}
  </ImageBackground>
);

export default Preview;
