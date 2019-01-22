// @flow

import * as React from 'react';
import {Platform} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import orientation from 'react-native-orientation-locker';

import Video from '../components/video';

type Props = {|
  source: File | {uri: string}
|};

class VideoExpandable extends React.PureComponent<Props> {
  props: Props;

  videoPlayer: VideoPlayer;

  handleExpand = () => {
    if (this.videoPlayer) {
      this.videoPlayer.player.ref.presentFullscreenPlayer();
      orientation.lockToLandscape();
    }
  };

  handleShrink = () => {
    if (this.videoPlayer) {
      this.videoPlayer.player.ref.dismissFullscreenPlayer();
      orientation.unlockAllOrientations();
    }
  };

  handleRef = (videoPlayer: VideoPlayer | null) => {
    this.videoPlayer = videoPlayer;
  };

  render() {
    return (
      <Video
        source={this.props.source}
        onExpand={this.handleExpand}
        onShrink={this.handleShrink}
        onRef={this.handleRef}
      />
    );
  }
}

export default VideoExpandable;
