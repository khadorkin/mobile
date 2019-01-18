// @flow

import * as React from 'react';
import {StyleSheet, Platform} from 'react-native';
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

let isVideoReady: boolean = false;

class Video extends React.PureComponent<Props> {
  props: Props;

  componentDidMount = () => {
    console.log("VIDEO MOUNTED")
    isVideoReady = false;
  };

  handleVideoReady = () => {
    console.log('ON VIDEO READY BUT');
    if (Platform.OS === 'android' && !isVideoReady) {
      isVideoReady = true;
      this.videoPlayer.seekTo(0);
      console.log('ON VIDEO READY');
    }
  };

  handleEnterFullscreen = () => {
    console.log('ENTER FULLSCREEN');
  };

  handleExitFullscreen = () => {
    console.log('EXIT FULLSCREEN');
  }

  render() {
    const {source, preview, testID} = this.props;

    return (
      <VideoPlayer
        testID={testID}
        source={{
          uri: source
        }} // Can be a URL or a local file.
        ref={ref => {
          this.videoPlayer = ref;
        }}
        style={styles.backgroundVideo}
        poster={preview}
        resizeMode="contain"
        onEnterFullscreen={this.handleEnterFullscreen}
        onExitFullscreen={this.handleExitFullscreen}
        onReadyForDisplay={this.handleVideoReady}
        disableVolume
        disableBack
      />
    );
  }
}

export default Video;
