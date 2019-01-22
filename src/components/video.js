// @flow

import * as React from 'react';
import {Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import videoPlayer from 'react-native-video-controls';
import orientation from 'react-native-orientation-locker';
import theme from '../modules/theme';

type Props = {|
  testID?: string,
  source: string,
  preview: string
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
  btnExpand: {
    alignSelf: 'flex-end',
    width: theme.spacing.small,
    height: theme.spacing.small,
    padding: theme.spacing.small,
    margin: theme.spacing.small
  }
});

class Video extends React.PureComponent<Props> {
  props: Props;

  videoPlayer: VideoPlayer;
  isVideoReady: boolean = false;
  isFullScreen: boolean = false;

  handleVideoReady = () => {
    if (Platform.OS === 'android' && !isVideoReady) {
      isVideoReady = true;
      this.videoPlayer.seekTo(0);
    }
  };

  handleFullscreen = () => {
    if (this.videoPlayer) {
      if (!isFullScreen) {
        isFullScreen = true;
        this.videoPlayer.player.ref.presentFullscreenPlayer();
        if (Platform.OS === 'android') {
          Orientation.lockToLandscape();
        }
      } else {
        isFullScreen = false;
        this.videoPlayer.player.ref.dismissFullscreenPlayer();
        if (Platform.OS === 'android') {
          Orientation.lockToPortrait();
        }
      }
    }
  };

  handleRef: (ref: VideoPlayer | null) => this.videoPlayer && this.videoPlayer = ref;


  render() {
    const {source, preview, testID} = this.props;

    return (
      <View style={styles.container}>
        <VideoPlayer
          testID={testID}
          source={{
            uri: source
          }}
          ref={this.handleRef}
          style={styles.video}
          poster={preview}
          resizeMode="contain"
          onReadyForDisplay={this.handleVideoReady}
          onEnd={this.handleVideoEnd}
          disableVolume
          disableBack
          disableFullscreen
        />
        <TouchableOpacity
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
