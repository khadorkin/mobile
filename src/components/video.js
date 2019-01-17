// @flow

import * as React from 'react';
import {StyleSheet} from 'react-native';
import Video from 'react-native-video';

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

const VideoPlayer = ({testID, source, preview}: Props) => (
  <Video
    source={{
      uri: source
    }} // Can be a URL or a local file.
    ref={ref => {
      this.player = ref;
    }} // Store reference
    style={styles.backgroundVideo}
    controls
    fullscreenOrientation="landscape"
    poster={preview}
    resizeMode="contain"
  />
);

export default VideoPlayer;
