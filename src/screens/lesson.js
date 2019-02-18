// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {
  getCurrentSlide,
  getEngineConfig,
  getResourceToPlay,
  selectResource
} from '@coorpacademy/player-store';

import Screen from '../components/screen';
import Lesson from '../components/lesson';
import type {StoreState} from '../redux/store';

import type {SelectResource} from '../types';
import type {Lesson as LessonType} from '../layer/data/_types';
import type {Params as PdfScreenParams} from './pdf';

export type ConnectedStateProps = {|
  header?: string,
  resources?: Array<LessonType>,
  starsGranted: number
|};

type ConnectedDispatchProps = {|
  selectResource: SelectResource
|};

type Props = {|
  ...ReactNavigation$ScreenProps,
  ...ConnectedDispatchProps,
  ...ConnectedStateProps
|};

class LessonScreen extends React.PureComponent<Props> {
  props: Props;

  handlePDFButtonPress = (url: string, description: string) => {
    const pdfParams: PdfScreenParams = {
      title: description,
      source: {uri: url}
    };

    this.props.navigation.navigate('PdfModal', pdfParams);
  };

  render() {
    const {header, resources, starsGranted, selectResource: _selectResource} = this.props;

    return (
      <Screen testID="lesson-screen" noScroll>
        {resources && (
          <Lesson
            header={header}
            resources={resources}
            starsGranted={starsGranted}
            selectResource={_selectResource}
            onPDFButtonPress={this.handlePDFButtonPress}
          />
        )}
      </Screen>
    );
  }
}

const mapStateToProps = (state: StoreState): ConnectedStateProps => {
  const slide = getCurrentSlide(state);
  const resourceToPlay = getResourceToPlay(state);
  const engineConfig = getEngineConfig(state);
  const starsGranted = (engineConfig && engineConfig.starsPerResourceViewed) || 0;

  const resources =
    (slide &&
      slide.lessons &&
      slide.lessons.map(lesson => ({
        ...lesson,
        selected: lesson._id === resourceToPlay
      }))) ||
    [];

  const selectedResource = resources.filter(resource => resource.selected)[0];
  if (resources.length > 0 && !selectedResource) {
    resources[0].selected = true;
  }

  return {
    // $FlowFixMe union type
    header: slide && slide.question && slide.question.header,
    // $FlowFixMe union type
    resources,
    starsGranted
  };
};

const mapDispatchToProps: ConnectedDispatchProps = {
  selectResource
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonScreen);
