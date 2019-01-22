// @flow

import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

import theme from '../modules/theme';

type Props = {|
  source: File | {uri: string},
  onExpand?: () => void,
  onShrink?: () => void,
  onRef?: (VideoPlayer | null) => void
|};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black,
    flex: 1
  },
  video: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  fullScreenButton: {
    alignSelf: 'flex-end',
    padding: theme.spacing.small,
    margin: theme.spacing.small
  }
});

const Video = ({source, onExpand, onShrink, onRef}: Props) => (
  <View style={styles.container}>
    <VideoPlayer
      testID="video"
      source={source}
      ref={onRef}
      style={styles.video}
      resizeMode="contain"
      disableVolume
      disableBack
      disableFullscreen={Boolean(!onExpand && !onShrink)}
      toggleResizeModeOnFullscreen={false}
      onEnterFullscreen={onExpand}
      onExitFullscreen={onShrink}
      onFullscreenPlayerWillDismiss={onShrink}
    />
  </View>
);

export default Video;
