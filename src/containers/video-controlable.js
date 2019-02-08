// @flow

import * as React from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import VideoPlayer from '@coorpacademy/react-native-video-controls';
import orientation from 'react-native-orientation-locker';
import RNFetchBlob from 'rn-fetch-blob';

import Video, {STEP} from '../components/video';
import type {Step} from '../components/video';
import {showNavigation, hideNavigation} from '../redux/actions/navigation';

type ConnectedDispatchToProps = {|
  showNavigation: typeof showNavigation,
  hideNavigation: typeof hideNavigation
|};

type Props = {|
  ...ConnectedDispatchToProps,
  source: File | {uri: string},
  preview: File | {uri: string},
  isCC: boolean,
  textTracks: Array<{}>,
  selectedTextTrack: {},
  height: number
|};

type State = {|
  step: Step,
  isFullScreen: boolean,
  selectedTextTrack: {}
|};

class VideoControlable extends React.PureComponent<Props, State> {
  props: Props;

  state: State = {
    step: STEP.PREVIEW,
    isFullScreen: false,
    selectedTextTrack: {type: 'disable'}
  };

  videoPlayer: VideoPlayer;

  isReady: boolean = false;

  handleExpand = () => {
    if (this.videoPlayer) {
      this.videoPlayer.player.ref.presentFullscreenPlayer();
      orientation.lockToLandscape();
      this.setState({
        isFullScreen: true
      });
      if (Platform.OS === 'android') {
        this.props.hideNavigation();
      }
    }
  };

  handleShrink = () => {
    if (this.videoPlayer) {
      this.videoPlayer.player.ref.dismissFullscreenPlayer();
      orientation.unlockAllOrientations();
      this.setState({
        isFullScreen: false
      });
      if (Platform.OS === 'android') {
        this.props.showNavigation();
      }
    }
  };

  handlePlay = () => {
    this.isReady = false;
    if (this.videoPlayer) {
      this.videoPlayer.seekTo(0);
    }
    this.setState({
      step: STEP.PLAY
    });
  };

  handleEnd = () => {
    this.handleShrink();
    this.setState({
      step: STEP.END
    });
  };

  handleReady = () => {
    // This is a hack to launch the video
    if (Platform.OS === 'android' && this.videoPlayer && !this.isReady) {
      this.isReady = true;
      this.videoPlayer.seekTo(0);
    }
  };

  handleRef = (videoPlayer: VideoPlayer | null) => {
    this.videoPlayer = videoPlayer;
  };

  handleCC = (isCC: boolean) => {
    if (isCC) {
      this.setState({
        selectedTextTrack: this.props.selectedTextTrack
      });
    } else {
      this.setState({
        selectedTextTrack:
          Platform.OS === 'ios'
            ? {
                type: 'title',
                value: 'nocc'
              }
            : {
                type: 'disabled'
              }
      });
    }
  };

  componentDidMount() {
    const {isCC, selectedTextTrack, textTracks} = this.props;
    this.handleCC(Boolean(isCC !== undefined ? isCC : selectedTextTrack));

    if (Platform.OS === 'ios') {
      const path: string = 'file://' + RNFetchBlob.fs.dirs.MainBundleDir + '/assets/empty.vtt';
      textTracks.push({
        title: 'nocc',
        language: 'en',
        type: 'text/vtt',
        uri: path
      });
    }
  }

  render() {
    return (
      <Video
        source={this.props.source}
        preview={this.props.preview}
        textTracks={this.props.textTracks}
        selectedTextTrack={this.state.selectedTextTrack}
        height={this.props.height}
        step={this.state.step}
        isFullScreen={this.state.isFullScreen}
        isCC={this.props.isCC}
        onPlay={this.handlePlay}
        onEnd={this.handleEnd}
        onReady={this.handleReady}
        onExpand={this.handleExpand}
        onShrink={this.handleShrink}
        onRef={this.handleRef}
        onCC={this.handleCC}
      />
    );
  }
}

const mapDispatchToProps: ConnectedDispatchToProps = {
  showNavigation,
  hideNavigation
};

export default connect(null, mapDispatchToProps)(VideoControlable);
