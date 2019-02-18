// @flow

import * as React from 'react';
import {View} from 'react-native';
import {RESOURCE_TYPE} from '../const';
import Video from '../containers/video-controlable';
import {getCleanUri} from '../modules/uri';
import type {Lesson} from '../layer/data/_types';
import Preview from './preview';

type OnPDFButtonPress = (url: string, description: string) => void;

type VideoProps = {|
  url: string,
  poster: string,
  height: number
|};

type PdfProps = {|
  ...VideoProps,
  description: string,
  onPress: OnPDFButtonPress
|};

class ResourcePdf extends React.PureComponent<PdfProps> {
  props: PdfProps;

  handleOnPress() {
    const {description, onPress, url} = this.props;
    onPress(url, description);
  }

  render() {
    const {height, poster} = this.props;
    return (
      <View style={{height}}>
        <Preview type={RESOURCE_TYPE.PDF} source={{uri: poster}} onPress={this.handleOnPress} />
      </View>
    );
  }
}

const ResourceVideo = ({url, poster, height}: VideoProps) => (
  <Video source={{uri: url}} preview={{uri: poster}} height={height} />
);

const Resource = ({
  resource,
  height,
  onPress
}: {|
  resource: Lesson,
  height: number,
  onPress: OnPDFButtonPress
|}) => {
  if (!resource) {
    return null;
  }

  switch (resource.type) {
    case RESOURCE_TYPE.VIDEO: {
      const url = resource.mediaUrl && getCleanUri(resource.mediaUrl);
      const poster = getCleanUri(resource.poster);
      if (!url || !poster) {
        return null;
      }
      return <ResourceVideo url={url} poster={poster} height={height} />;
    }
    case RESOURCE_TYPE.PDF: {
      const url = getCleanUri(resource.mediaUrl);
      const poster = getCleanUri(resource.poster);
      const description = resource.description;
      if (!url || !poster) {
        return null;
      }

      return (
        <ResourcePdf
          url={url}
          poster={poster}
          height={height}
          description={description}
          onPress={onPress}
        />
      );
    }
    default:
      return null;
  }
};

export default Resource;
