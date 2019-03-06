// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import type {Media} from '@coorpacademy/progression-engine';
import {selectRoute} from '@coorpacademy/player-store';

import {getSlide} from '../redux/utils/state-extract';
import Screen from '../components/screen';
import Context from '../components/context';
import type {Params as PdfScreenParams} from './pdf';

type ConnectedStateProps = {|
  ...ReactNavigation$ScreenProps,
  header?: string,
  description?: string,
  mediaSources?: Media
|};

type ConnectedDispatchProps = {|
  selectRoute: typeof selectRoute
|};

type Props = {|
  ...ReactNavigation$ScreenProps,
  ...ConnectedStateProps,
  ...ConnectedDispatchProps
|};

class ContextScreen extends React.PureComponent<Props> {
  props: Props;

  UNSAFE_componentWillMount() {
    if (this.props.hasNoContext) {
      this.props.selectRoute('question');
      this.props.navigation.navigate('Question');
    }
  }

  handleButtonPress = () => {
    this.props.selectRoute('question');
    this.props.navigation.navigate('Question');
  };

  handleOpenBrowserButtonPress = (_, url) => {
    this.props.navigation.navigate('BrowserModal', {url});
  };

  handlePDFButtonPress = (url: string, description: string) => {
    const pdfParams: PdfScreenParams = {
      title: description,
      source: {uri: url}
    };

    this.props.navigation.navigate('PdfModal', pdfParams);
  };

  render() {
    const {header, description, mediaSources} = this.props;

    return (
      <Screen testID="context-screen">
        <Context
          header={header}
          description={description}
          mediaSources={mediaSources}
          onPress={this.handleButtonPress}
          onPDFButtonPress={this.handlePDFButtonPress}
          onOpenBrowser={this.handleOpenBrowserButtonPress}
          testID="context"
        />
      </Screen>
    );
  }
}

export const mapStateToProps = (state: StoreState): Props => {
  const slide = getSlide(state);

  const slideContext = slide && slide.context;
  return {
    description: slideContext && slideContext.description,
    header: slideContext && slideContext.title,
    hasNoContext: !(slide && slide.context && slide.context.title),
    mediaSources: slideContext && slideContext.media
  };
};

const mapDispatchToProps: ConnectedDispatchProps = {
  selectRoute
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextScreen);