// @flow

import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import Video from '../components/video';

type Props = {|
  source: string,
  preview: string
|};

type State = {|
  isFullScreen: boolean
|};

class VideoExpandable extends React.PureComponent<Props, State> {
  props: Props;

  videoPlayer: VideoPlayer;

  state: State = {
    isFullScreen: false
  };

  handleFullscreen = () =>
    this.setState(({isFullScreen}: State) => ({
      isFullScreen: !isFullScreen
    }));

  handleOrientationSwitch = () => {
    if (!isFullScreen) {
      this.videoPlayer.player.ref.presentFullscreenPlayer();
      if (Platform.OS === 'android') {
        orientation.lockToLandscape();
      }
    } else {
      this.videoPlayer.player.ref.dismissFullscreenPlayer();
      if (Platform.OS === 'android') {
        orientation.unlockAllOrientations();
      }
    }
  };

  componentDidUpdate = (prevProps: Props) => {
    const {isFullScreen} = this.props;

    if (this.videoPlayer && prevProps.isFullScreen !== isFullScreen) {
      this.handleOrientationSwitch();
    }
  };

  handleRef = (ref: VideoPlayer | null) => this.videoPlayer = ref;

  render() {
    const {source, preview} = this.props;

    return (
      <Video
        source={source}
        preview={preview}
        isFullScreen={this.state.isFullScreen}
        onFullScreen={this.handleFullScreen}
        onRef={this.handleRef}
      />
    );
  }
}

export default VideoExpandable;
