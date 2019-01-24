// @flow

import * as React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {NovaSolidDesignActionsRedo} from '@coorpacademy/nova-icons';

import theme from '../modules/theme';
import Preview from './preview';
import ResourceOverlay from './resource-overlay';

export type Step = 'preview' | 'play' | 'end';

type Props = {|
  source: File | {uri: string},
  preview: File | {uri: string},
  step: Step,
  isFullScreen?: boolean,
  onPlay: () => void,
  onEnd: () => void,
  onReady: () => void,
  onExpand?: () => void,
  onShrink?: () => void,
  onRef?: (VideoPlayer | null) => void
|};

export const STEP: {[key: string]: Step} = {
  PREVIEW: 'preview',
  PLAY: 'play',
  END: 'end'
};

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
    padding: theme.spacing.small,
    margin: theme.spacing.small
  }
});

const Video = ({
  source,
  preview,
  step,
  isFullScreen,
  onPlay,
  onReady,
  onEnd,
  onExpand,
  onShrink,
  onRef
}: Props) => (
  <View style={styles.container}>
    {step === STEP.PREVIEW && <Preview type="video" source={preview} onButtonPress={onPlay} />}
    {step === STEP.PLAY && (
      <VideoPlayer
        testID="video"
        source={source}
        ref={onRef}
        style={styles.video}
        resizeMode="contain"
        disableVolume
        disableBack
        disableFullscreen={Boolean(!onExpand && !onShrink)}
        toggleResizeModeOnFullscreen={false}
        isFullScreen={isFullScreen}
        onEnterFullscreen={onExpand}
        onExitFullscreen={onShrink}
        onFullscreenPlayerWillDismiss={onShrink}
        onEnd={onEnd}
        onReadyForDisplay={onReady}
      />
    )}
    {step === STEP.END && (
      <ResourceOverlay>
        <TouchableOpacity onPress={onPlay}>
          <NovaSolidDesignActionsRedo color={theme.colors.white} height={40} width={40} />
        </TouchableOpacity>
      </ResourceOverlay>
    )}
  </View>
);

export default Video;
