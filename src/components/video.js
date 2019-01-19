// @flow

import * as React from 'react';
import {Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

type Props = {|
  testID?: string,
  source: string,
  preview: string
|};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1
  },
  video: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  btnExpand: {
    alignSelf: 'flex-end',
    width: 15,
    height: 15,
    padding: 15,
    margin: 15
  }
});

let isVideoReady: boolean = false;
let isFullScreen: boolean = false;

class Video extends React.PureComponent<Props> {
  props: Props;

  componentDidMount = () => {
    isVideoReady = false;
  };

  handleVideoReady = () => {
    if (Platform.OS === 'android' && !isVideoReady) {
      isVideoReady = true;
      this.videoPlayer.seekTo(0);
    }
  };

  handleFullscreen = () => {
    if (!isFullScreen) {
      isFullScreen = true;
      this.videoPlayer.player.ref.presentFullscreenPlayer();
    } else {
      isFullScreen = false;
      this.videoPlayer.player.ref.dismissFullscreenPlayer();
    }
  };

  render() {
    const {source, preview, testID} = this.props;

    return (
      <View style={styles.container}>
        <VideoPlayer
          testID={testID}
          source={{
            uri: source
          }} // Can be a URL or a local file.
          ref={ref => {
            this.videoPlayer = ref;
          }}
          style={styles.video}
          poster={preview}
          resizeMode="contain"
          onReadyForDisplay={this.handleVideoReady}
          disableVolume
          disableBack
          disableFullscreen
        />
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => {
            this.handleFullscreen();
          }}
        >
          <Image
            width={15}
            height={15}
            style={styles.btnExpand}
            source={{uri: 'https://reddingdesigns.com/images/icons/icon-expand-white.png'}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Video;
