// @flow

import * as React from 'react';
import {View} from 'react-native';
import type {LessonType} from '@coorpacademy/progression-engine';

import {RESOURCE_TYPE} from '../const';

import Video from '../containers/video-controlable';
import {getCleanUri} from '../modules/uri';
import Preview from './preview';

type Props = {|
  type: LessonType,
  thumbnail: string,
  url: string,
  description: string,
  subtitles?: string,
  height: number,
  onPDFButtonPress: (url: string, description: string) => void,
  testID?: string
|};

class Resource extends React.PureComponent<Props> {
  props: Props;

  handlePress = () => {
    const {url, description, onPDFButtonPress} = this.props;
    onPDFButtonPress(getCleanUri(url), description);
  };

  render() {
    const {type, thumbnail, url, subtitles, height, testID} = this.props;

    switch (type) {
      case RESOURCE_TYPE.VIDEO: {
        return (
          <Video
            source={{uri: getCleanUri(url)}}
            subtitles={subtitles}
            preview={{uri: getCleanUri(thumbnail)}}
            height={height}
            testID={testID}
          />
        );
      }
      case RESOURCE_TYPE.PDF: {
        return (
          <View style={{height}}>
            <Preview
              type={RESOURCE_TYPE.PDF}
              source={{uri: getCleanUri(thumbnail)}}
              onPress={this.handlePress}
              testID={testID}
            />
          </View>
        );
      }
      default:
        return null;
    }
  }
}

export default Resource;
