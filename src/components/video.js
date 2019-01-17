// @flow

import * as React from 'react';
import {StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

type Props = {|
  testID?: string,
  source: string,
  preview: string
|};

const styles = StyleSheet.create({
  backgroundVideo: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

const Video = ({testID, source, preview}: Props) => (
  <VideoPlayer
    source={{
      uri: source
    }} // Can be a URL or a local file.
    ref={ref => {
      this.player = ref;
    }} // Store reference
    style={styles.backgroundVideo}
    fullscreenOrientation="landscape"
    poster={preview}
    resizeMode="contain"
    disableBack
  />
);

export default Video;
