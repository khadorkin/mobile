// @flow

import * as React from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import type {ContentType} from '@coorpacademy/progression-engine';
import {getNextContent, getCurrentProgression, getCurrentContent} from '@coorpacademy/player-store';
import type {LevelAPI, ChapterAPI} from '@coorpacademy/player-services';
// import get from 'lodash/fp/get';

import {selectCard} from '../redux/actions/catalog/cards';
import LevelEnd, {POSITIVE_COLOR, NEGATIVE_COLOR} from '../components/level-end';
import type {DisciplineCard, ChapterCard, Level, Chapter} from '../layer/data/_types';
import Screen from '../components/screen';
import {compareCards} from '../utils/content';
import {getBestScore} from '../redux/utils/state-extract';
import translations from '../translations';
import playSound, {AUDIO_FILE} from '../modules/audio-player';

type ConnectedDispatchProps = {|
  selectCard: typeof selectCard
|};

type ConnectedStateProps = {|
  contentType: ContentType | void,
  recommendation: DisciplineCard | ChapterCard,
  bestScore?: string,
  currentContent?: Level | Chapter,
  nextContent?: LevelAPI | ChapterAPI
|};

export type Params = {|
  isCorrect: boolean,
  progressionId: string
|};

type Props = $Exact<{|
  ...ReactNavigation$ScreenPropsWithParams<Params>,
  ...ConnectedStateProps
|}>;

type State = {|
  isFocused: boolean
|};

class LevelEndScreen extends React.PureComponent<Props, State> {
  props: Props;

  state: State;

  state = {
    isFocused: false
  };

  static navigationOptions = ({navigationOptions, navigation}: ReactNavigation$ScreenProps) => ({
    ...navigationOptions,
    headerStyle: {}
  });

  componentDidMount() {
    const {isCorrect} = this.props.navigation.state.params;

    if (isCorrect) {
      return playSound(AUDIO_FILE.SUCCESS_LEVEL);
    }
    return playSound(AUDIO_FILE.FAILURE_LEVEL);
  }

  handleClosePress = () => {
    const {navigation} = this.props;
    navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'Home'
      })
    );
  };

  handleCardPress = (item: DisciplineCard | ChapterCard) => {
    const {navigation, recommendation} = this.props;

    this.props.selectCard(recommendation);
    navigation.navigate('Slide');
  };

  handleButtonPress = () => {
    const {navigation, currentContent, nextContent} = this.props;
    const {isCorrect} = navigation.state.params;

    const content = !isCorrect ? currentContent : nextContent;

    if (content) {
      throw new Error('should be implemented');
      // @todo selectProgression
      return navigation.navigate('Slide');
    }

    return navigation.navigate('Home');
  };

  handleDidFocus = () => this.setState({isFocused: true});

  render() {
    const {contentType, navigation, recommendation, bestScore = '', nextContent} = this.props;
    const {isCorrect} = navigation.state.params;

    const backgroundColor = (isCorrect && POSITIVE_COLOR) || NEGATIVE_COLOR;

    return (
      <Screen testID="level-end-screen" noScroll noSafeArea style={{backgroundColor}}>
        <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
        <NavigationEvents onDidFocus={this.handleDidFocus} />
        <LevelEnd
          contentType={contentType}
          recommendation={recommendation}
          isFocused={this.state.isFocused}
          isSuccess={isCorrect}
          bestScore={bestScore}
          nextContentType={nextContent.type}
          nextContentLabel={nextContent.label}
          onClose={this.handleClosePress}
          onCardPress={this.handleCardPress}
          onButtonPress={this.handleButtonPress}
        />
      </Screen>
    );
  }
}

export const mapStateToProps = (state: StoreState, {navigation}: Props): ConnectedStateProps => {
  const language = translations.getLanguage();

  const bestScore = getBestScore(state);
  const progression = getCurrentProgression(state);
  const contentType = progression && progression.content.type;

  // $FlowFixMe union type
  const nextContent: LevelAPI | void = getNextContent(state);
  // $FlowFixMe union type
  const currentContent: Level | Chapter = getCurrentContent(state);

  return {
    contentType,
    nextContent,
    currentContent,
    bestScore,
    recommendation: Object.keys(state.catalog.entities.cards)
      .map(key => state.catalog.entities.cards[key][language])
      .filter(item => item !== undefined)
      .filter(item => ![item.universalRef, item.ref].includes(currentContent.ref))
      .sort(compareCards)[0]
  };
};

const mapDispatchToProps: ConnectedDispatchProps = {
  selectCard
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LevelEndScreen);
