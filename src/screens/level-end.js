// @flow

import * as React from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import type {ContentType} from '@coorpacademy/progression-engine';
import {getNextContent, getCurrentProgression} from '@coorpacademy/player-store';
import type {LevelAPI} from '@coorpacademy/player-services';
import get from 'lodash/fp/get';

import {selectCard} from '../redux/actions/catalog/cards';
import LevelEnd, {POSITIVE_COLOR, NEGATIVE_COLOR} from '../components/level-end';
import type {DisciplineCard, ChapterCard} from '../layer/data/_types';
import Screen from '../components/screen';
import {compareCards} from '../utils/content';
import {getCurrentContent, didUnlockLevel} from '../utils';
import {getBestScore} from '../redux/utils/state-extract';
import type {UnlockedLevelInfo} from '../types';
import translations from '../translations';
import playSound, {AUDIO_FILE} from '../modules/audio-player';

type ConnectedDispatchProps = {|
  selectCard: typeof selectCard
|};

type ConnectedStateProps = {|
  contentType: ContentType | void,
  recommendation: DisciplineCard | ChapterCard,
  bestScore?: string,
  nextLevel?: LevelAPI,
  unlockedLevelInfo?: UnlockedLevelInfo
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
    const {navigation, nextLevel} = this.props;
    const {isCorrect} = navigation.state.params;

    const level = isCorrect ? currentLevel() : nextLevel;

    if (level) {
      // @todo selectProgression
      return navigation.navigate('Slide');
    }

    return navigation.navigate('Home');

    // if (currentContent) {
    //   if (hasFinishedCourse) {
    //     return navigation.navigate('Home');
    //   }
    //
    //   if (nextContent && isCorrect) {
    //     this.props.selectCard(nextContent);
    //   } else {
    //     this.props.selectCard(currentContent);
    //   }
    //
    //   return navigation.navigate('Slide');
    // }
  };

  handleDidFocus = () => this.setState({isFocused: true});

  render() {
    const {
      contentType,
      navigation,
      recommendation,
      unlockedLevelInfo,
      bestScore = '',
      nextLevel
    } = this.props;
    const {isCorrect} = navigation.state.params;

    const backgroundColor = (isCorrect && POSITIVE_COLOR) || NEGATIVE_COLOR;
    const isLevelUnlocked = unlockedLevelInfo && unlockedLevelInfo.isUnlocked;
    const levelUnlockedName = unlockedLevelInfo && unlockedLevelInfo.levelName;

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
          isLevelUnlocked={isLevelUnlocked}
          levelUnlockedName={levelUnlockedName}
          onClose={this.handleClosePress}
          onCardPress={this.handleCardPress}
          onButtonPress={this.handleButtonPress}
          hasNextLevel={Boolean(nextLevel)}
        />
      </Screen>
    );
  }
}

export const mapStateToProps = (state: StoreState, {navigation}: Props): ConnectedStateProps => {
  const language = translations.getLanguage();
  const currentProgressionId = navigation.state.params.progressionId;
  const currentContentInfo = get(
    `data.progressions.entities.${currentProgressionId}.content`,
    state
  );

  const bestScore = getBestScore(state);
  const progression = getCurrentProgression(state);
  const contentType = progression && progression.content.type;

  // $FlowFixMe union type
  const nextLevel: LevelAPI | void = getNextContent(state);
  const currentContent: DisciplineCard | ChapterCard | void =
    currentContentInfo && getCurrentContent(state.catalog, currentContentInfo, language);

  const unlockedLevelInfo =
    currentContentInfo && currentContent && didUnlockLevel(currentContentInfo, currentContent);

  return {
    contentType,
    nextLevel,
    bestScore,
    unlockedLevelInfo,
    recommendation: Object.keys(state.catalog.entities.cards)
      .map(key => state.catalog.entities.cards[key][language])
      .filter(item => item !== undefined)
      .filter(item => item !== currentContent)
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
