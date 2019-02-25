// @flow

import * as React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import type {_BottomTabBarProps, TabScene} from 'react-navigation';
import {getCurrentSlide} from '@coorpacademy/player-store';

import type {StoreState} from '../redux/store';
import theme from '../modules/theme';
import Text from '../components/text';
import TabBar from './tab-bar';

type ConnectedStateToProps = {|
  hasNotClue: boolean,
  hasNoLesson: boolean
|};

type Props = {|
  ...ConnectedStateToProps,
  ...$Exact<_BottomTabBarProps>
|};

const INACTIVE_COLOR = theme.colors.gray.lightMedium;

const styles = StyleSheet.create({
  inactiveText: {
    color: INACTIVE_COLOR
  }
});

class TabBarSlide extends React.PureComponent<Props> {
  props: Props;

  handleTabPress = (scene: TabScene) => {
    // $FlowFixMe the definition is incomplete for this
    const {onTabPress, hasNotClue, hasNoLesson} = this.props;

    if (
      (scene.route.routeName === 'Clue' && hasNotClue) ||
      (scene.route.routeName === 'Lesson' && hasNoLesson)
    ) {
      return;
    }

    return onTabPress(scene);
  };

  renderIcon = (scene: TabScene) => {
    const {renderIcon, hasNotClue, hasNoLesson} = this.props;

    if (
      (scene.route.key === 'Clue' && hasNotClue) ||
      (scene.route.key === 'Lesson' && hasNoLesson)
    ) {
      return renderIcon({
        ...scene,
        tintColor: hasNotClue ? INACTIVE_COLOR : scene.tintColor
      });
    }

    return renderIcon(scene);
  };

  getLabelText = (scene: TabScene) => {
    const {getLabelText, labelStyle, hasNotClue, hasNoLesson} = this.props;

    if (
      (scene.route.key === 'Clue' && hasNotClue) ||
      (scene.route.key === 'Lesson' && hasNoLesson)
    ) {
      return <Text style={[labelStyle, styles.inactiveText]}>{getLabelText(scene)}</Text>;
    }

    return getLabelText(scene);
  };

  render() {
    const {navigation, ...props} = this.props;

    return (
      <TabBar
        {...props}
        navigation={navigation}
        onTabPress={this.handleTabPress}
        renderIcon={this.renderIcon}
        getLabelText={this.getLabelText}
      />
    );
  }
}

const mapStateToProps = (state: StoreState): ConnectedStateToProps => {
  const slide = getCurrentSlide(state);
  // $FlowFixMe overrided type
  const resources: Array<LessonType> = (slide && slide.lessons) || [];
  const hasNotClue = !(slide && slide.clue);
  const hasNoLesson = !resources.length;

  return {
    hasNotClue,
    hasNoLesson
  };
};

export default connect(mapStateToProps)(TabBarSlide);
