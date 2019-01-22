// @flow

import * as React from 'react';
import {Platform} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import orientation from 'react-native-orientation-locker';

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

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    const {isFullScreen} = this.state;

    if (this.videoPlayer && prevState.isFullScreen !== isFullScreen) {
      this.handleOrientationSwitch();
    }
  };

  handleOrientationSwitch = () => {
    const {isFullScreen} = this.state;

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

  handleFullScreen = () =>
    this.setState(({isFullScreen}: State) => ({
      isFullScreen: !isFullScreen
    }));

  handleRef = (ref: VideoPlayer | null) => {
    this.videoPlayer = ref;
  };

  render() {
    const {source, preview} = this.props;
    const {isFullScreen} = this.state;

    return (
      <Video
        source={source}
        preview={preview}
        isFullScreen={isFullScreen}
        onFullScreen={this.handleFullScreen}
        onRef={this.handleRef}
      />
    );
  }
}

export default VideoExpandable;
