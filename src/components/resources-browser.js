// @flow

import * as React from 'react';
import {FlatList, ImageBackground, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  NovaSolidAudioAudioControlPlay as PlayIcon,
  NovaLineFilesOfficeFileOfficePdf as PDFIcon
} from '@coorpacademy/nova-icons';

import type {Lesson} from '../layer/data/_types';
import {RESOURCE_TYPE} from '../const';
import theme from '../modules/theme';
import {getCleanUri} from '../modules/uri';
import {BrandThemeContext} from './brand-theme-provider';
import Html from './html';
import Space from './space';

type Props = {|
  onChange: (id: string) => void,
  selectedResourceId: string,
  resources: Array<Lesson>
|};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.small
  },
  resourceLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base
  },
  imageBorder: {
    width: 70,
    height: 45,
    resizeMode: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 66,
    height: 41
  },
  icon: {
    position: 'absolute'
  },
  descriptionWrapper: {
    paddingLeft: theme.spacing.small,
    paddingRight: theme.spacing.xlarge
  },
  description: {
    color: theme.colors.gray.dark
  }
});

class ResourcesBrowser extends React.PureComponent<Props> {
  props: Props;

  handleOnPress = (resource: Lesson) => () => this.props.onChange(resource._id);

  renderSeparator = () => <Space />;

  renderItem = () => <Space />;

  render() {
    const {selectedResourceId, resources} = this.props;

    return (
      <BrandThemeContext.Consumer>
        {brandTheme => {
          const selectedImageStyle = {
            borderColor: brandTheme.colors.primary,
            borderWidth: 1
          };

          const selectedDescriptionStyle = {
            fontWeight: theme.fontWeight.bold,
            borderColor: brandTheme.colors.primary
          };

          if (!resources || resources.length === 1) {
            return null;
          }

          return (
            <FlatList
              style={styles.container}
              data={resources}
              extraData={selectedResourceId}
              ItemSeparatorComponent={this.renderSeparator}
              // eslint-disable-next-line react/jsx-no-bind
              renderItem={({item: resource}) => {
                return (
                  <TouchableOpacity
                    onPress={this.handleOnPress(resource)}
                    key={resource._id}
                    style={styles.resourceLine}
                    testID={`resource-${resource._id}`}
                  >
                    <View
                      style={[
                        styles.imageBorder,
                        selectedResourceId === resource._id && selectedImageStyle
                      ]}
                    >
                      <ImageBackground
                        source={{uri: resource.poster && getCleanUri(resource.poster)}}
                        style={styles.image}
                        resizeMode="cover"
                      />
                      {resource.type === RESOURCE_TYPE.VIDEO &&
                        !selectedResourceId === resource._id && (
                          <PlayIcon
                            style={styles.icon}
                            color={theme.colors.white}
                            height={20}
                            width={20}
                          />
                        )}
                      {resource.type === RESOURCE_TYPE.PDF &&
                        !selectedResourceId === resource._id && (
                          <PDFIcon
                            style={styles.icon}
                            color={theme.colors.white}
                            height={20}
                            width={20}
                          />
                        )}
                    </View>

                    <View style={styles.descriptionWrapper}>
                      <Html
                        fontSize={15}
                        style={[
                          styles.description,
                          selectedResourceId === resource._id && selectedDescriptionStyle
                        ]}
                      >
                        {resource.description || ''}
                      </Html>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          );
        }}
      </BrandThemeContext.Consumer>
    );
  }
}

export default ResourcesBrowser;
