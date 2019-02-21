// @flow

import * as React from 'react';
import {View} from 'react-native';
import {RESOURCE_TYPE} from '../const';
import Video from '../containers/video-controlable';
import {getCleanUri} from '../modules/uri';
import type {Lesson} from '../layer/data/_types';
import Preview from './preview';

type OnPDFButtonPress = (url: string, description: string) => void;

type Props = {|
  resource: Lesson,
  height: number,
  onPDFButtonPress: OnPDFButtonPress
|};

class Resource extends React.PureComponent<Props> {
  props: Props;

  handlePress = (resource: Lesson) => () => {
    const url = getCleanUri(resource.mediaUrl);
    const description = resource.description;
    const {onPDFButtonPress} = this.props;
    onPDFButtonPress(url, description);
  };

  render() {
    const {resource, height} = this.props;
    switch (resource.type) {
      case RESOURCE_TYPE.VIDEO: {
        const url = resource.mediaUrl && getCleanUri(resource.mediaUrl);
        const poster = getCleanUri(resource.poster);
        return <Video source={{uri: url}} preview={{uri: poster}} height={height} />;
      }
      case RESOURCE_TYPE.PDF: {
        const poster = getCleanUri(resource.poster);

        return (
          <View style={{height}}>
            <Preview
              type={RESOURCE_TYPE.PDF}
              source={{uri: poster}}
              onPress={this.handlePress(resource)}
            />
          </View>
        );
      }
    }
  }
}

export default Resource;
