// @flow

import * as React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {
  NovaSolidResizeMoveExpand3 as ExpandIcon,
  NovaSolidResizeMoveShrink1 as ShrinkIcon
} from '@coorpacademy/nova-icons';

import theme from '../modules/theme';

type Props = {|
  source: string,
  preview: string,
  isFullScreen: boolean,
  onFullScreen?: () => void,
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
    width: theme.spacing.small,
    height: theme.spacing.small,
    padding: theme.spacing.small,
    margin: theme.spacing.small
  }
});

class Video extends React.PureComponent<Props> {
  props: Props;

  videoPlayer: VideoPlayer;

  isReady: boolean = false;

  handleVideoReady = () => {
    if (Platform.OS === 'android' && !this.isReady) {
      this.isReady = true;
      this.videoPlayer.seekTo(0);
    }
  };

  handleRef = (element: VideoPlayer | null) => {
    this.videoPlayer = element;

    if (this.props.onRef) {
      this.props.onRef(element);
    }
  };

  render() {
    const {source, preview, onFullScreen, isFullScreen} = this.props;
    const testIDSuffix = isFullScreen ? '-fullscreen' : '';

    return (
      <View style={styles.container}>
        <VideoPlayer
          testID={`video${testIDSuffix}`}
          source={{
            uri: source
          }}
          ref={this.handleRef}
          style={styles.video}
          poster={preview}
          resizeMode="contain"
          onReadyForDisplay={this.handleVideoReady}
          disableVolume
          disableBack
          disableFullscreen
        />
        {onFullScreen && (
          <TouchableOpacity onPress={onFullScreen} style={styles.fullScreenButton}>
            {isFullScreen ? (
              <ShrinkIcon height={15} width={15} color={theme.colors.white} />
            ) : (
              <ExpandIcon height={15} width={15} color={theme.colors.white} />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default Video;
