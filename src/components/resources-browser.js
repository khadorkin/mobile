// @flow

import * as React from 'react';
import {ImageBackground, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  NovaSolidAudioAudioControlPlay as PlayIcon,
  NovaLineFilesOfficeFileOfficePdf as PDFIcon
} from '@coorpacademy/nova-icons';

import type {Lesson} from '../layer/data/_types';
import {RESOURCE_TYPE} from '../const';
import type {SelectResource} from '../types';
import theme from '../modules/theme';
import {getCleanUri} from '../modules/uri';
import {BrandThemeContext} from './brand-theme-provider';
import Html from './html';

type Props = {|
  selectResource: SelectResource,
  resources: Array<Lesson>
|};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'flex-start'
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 34
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
    paddingLeft: 14,
    paddingRight: 60
  },
  description: {
    color: theme.colors.gray.dark
  }
});

class ResourcesBrowser extends React.PureComponent<Props> {
  props: Props;

  handleOnPress = (resource: Lesson) => () => this.props.selectResource(resource._id);

  render() {
    const {resources} = this.props;
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
            <View style={styles.container}>
              {resources.map((resource, index) => {
                return (
                  <TouchableOpacity
                    onPress={this.handleOnPress(resource)}
                    key={index}
                    style={styles.line}
                    testID={`resource-${index}`}
                  >
                    <View style={[styles.imageBorder, resource.selected && selectedImageStyle]}>
                      <ImageBackground
                        source={{uri: resource.poster && getCleanUri(resource.poster)}}
                        style={styles.image}
                        resizeMode="cover"
                      />
                      {resource.type === RESOURCE_TYPE.VIDEO &&
                        !resource.selected && (
                          <PlayIcon
                            style={styles.icon}
                            color={theme.colors.white}
                            height={20}
                            width={20}
                          />
                        )}
                      {resource.type === RESOURCE_TYPE.PDF &&
                        !resource.selected && (
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
                        style={[styles.description, resource.selected && selectedDescriptionStyle]}
                      >
                        {resource.description}
                      </Html>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
      </BrandThemeContext.Consumer>
    );
  }
}

export default ResourcesBrowser;
