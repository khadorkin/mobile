// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import type {NavigationState} from 'react-navigation';

import {changeScreen} from '../redux/actions/navigation';
import {INITIAL_APP_ROUTE_NAME, INITIAL_ROUTE_NAME} from './navigation-options';
import navigator from './root';

const Navigator = createAppContainer(navigator);

type ConnectedDispatchProps = {|
  onScreenChange: typeof changeScreen
|};

type Props = {|
  ...ConnectedDispatchProps
|};

type ExtractScreensResult = {|
  currentNavigatorName: string,
  currentAppScreenName?: string,
  currentScreenName?: string,
  currentTabName?: string
|};

const extractScreens = (state: NavigationState): ExtractScreensResult => {
  const rootNavigator = state.routes[state.index];
  const stackNavigator = state.routes[0];
  const appScreen = stackNavigator.routes ? stackNavigator.routes[stackNavigator.index] : null;
  const screen = rootNavigator.routes ? rootNavigator.routes[rootNavigator.index] : null;
  const tabs = screen && screen.routes ? screen.routes[screen.index] : null;
  const tab = tabs && tabs.routes ? tabs.routes[tabs.index] : null;

  const currentNavigatorName = rootNavigator.routeName;
  const currentAppScreenName = (appScreen && appScreen.routeName) || undefined;
  const currentScreenName = (screen && screen.routeName) || undefined;
  const currentTabName = (tab && tab.routeName) || undefined;

  return {currentNavigatorName, currentAppScreenName, currentScreenName, currentTabName};
};

class NavigatorWithState extends React.PureComponent<Props> {
  props: Props;

  componentDidMount() {
    this.props.onScreenChange(INITIAL_APP_ROUTE_NAME, INITIAL_ROUTE_NAME, INITIAL_ROUTE_NAME);
  }

  handleNavigationStateChange = (prevState: NavigationState, currentState: NavigationState) => {
    const {onScreenChange} = this.props;

    if (!currentState) {
      return null;
    }

    const prevScreens = extractScreens(prevState);
    const currentScreens = extractScreens(currentState);

    // To prevent same navigation dispatch
    if (JSON.stringify(prevScreens) === JSON.stringify(currentScreens)) {
      return null;
    }

    const {
      currentNavigatorName,
      currentAppScreenName,
      currentScreenName,
      currentTabName
    } = currentScreens;

    if (!currentAppScreenName || !currentScreenName) {
      return null;
    }

    onScreenChange(currentNavigatorName, currentAppScreenName, currentScreenName, currentTabName);
  };

  render() {
    return <Navigator onNavigationStateChange={this.handleNavigationStateChange} />;
  }
}

const mapDispatchToProps: ConnectedDispatchProps = {
  onScreenChange: changeScreen
};

export default connect(
  null,
  mapDispatchToProps
)(NavigatorWithState);
