// @flow

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import Button from '../components/button';
import Space from '../components/space';
import Screen from '../components/screen';
import theme from '../modules/theme';
import {selectLevel, selectChapter} from '../redux/actions/content';
import type {Level, Chapter, Discipline} from '../layer/data';
// @todo remove it once we a catalog
import onboardingCourse from '../__fixtures__/onboarding-course';

type ConnectedDispatchProps = {|
  selectLevel: typeof selectLevel,
  selectChapter: typeof selectChapter
|};

type Props = {|
  ...ReactNavigation$ScreenProps,
  ...ConnectedDispatchProps
|};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.base,
    justifyContent: 'flex-end'
  }
});

class HomeScreen extends React.PureComponent<Props> {
  props: Props;

  static navigationOptions = ({navigationOptions, navigation}: ReactNavigation$ScreenProps) => ({
    ...navigationOptions,
    headerMode: 'none',
    headerStyle: {
      ...navigationOptions.headerStyle,
      height: 0
    }
  });

  handleLevelPress = (level: Level) => () => {
    this.props.selectLevel(level);
    this.props.navigation.navigate('Slide');
  };

  handleChapterPress = (chapter: Chapter) => () => {
    this.props.selectChapter(chapter);
    this.props.navigation.navigate('Slide');
  };

  render() {
    const firstDiscipline: Discipline = onboardingCourse.disciplines.dis_4y8q7qLLN;
    const firstLevel: Level = firstDiscipline.modules[0];
    const firstChapter: Chapter = onboardingCourse.chapters['cha_Vy-gSqL8E'];

    return (
      <Screen testID="home-screen" noScroll>
        <View style={styles.container} testID="home">
          <Button onPress={this.handleLevelPress(firstLevel)} testID="button-start-onboarding">
            Start onboarding
          </Button>
          <Space />
          <Button
            onPress={this.handleChapterPress(firstChapter)}
            testID="button-start-onboarding-chapter"
          >
            Start onboarding chapter
          </Button>
        </View>
      </Screen>
    );
  }
}

const mapDispatchToProps: ConnectedDispatchProps = {
  selectLevel,
  selectChapter
};

export default connect(null, mapDispatchToProps)(HomeScreen);
