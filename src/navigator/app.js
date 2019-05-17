// @flow strict

import * as React from 'react';
import {createStackNavigator, NavigationActions} from 'react-navigation';
import type {NavigationAction, NavigationState} from 'react-navigation';

import HeaderSlideTitle from '../containers/header-slide-title';
import HeaderSlideRight from '../containers/header-slide-right';
import withUniversalLinks from '../containers/with-universal-links';
import HomeScreen from '../screens/home';
import AuthenticationScreen from '../screens/authentication';
import AuthenticationDetailsScreen from '../screens/authentication-details';
import {slideNavigator} from './slide';
import navigationOptions, {
  navigationOptionsWithoutHeader,
  HEADER_BACKGROUND_COLOR,
  INITIAL_ROUTE_NAME
} from './navigation-options';

const appNavigator = createStackNavigator(
  {
    Authentication: {
      // Keep this HOC in initial screen
      screen: withUniversalLinks(AuthenticationScreen),
      navigationOptions: {
        ...navigationOptionsWithoutHeader,
        gesturesEnabled: false
      }
    },
    AuthenticationDetails: {
      screen: AuthenticationDetailsScreen,
      navigationOptions: navigationOptionsWithoutHeader
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        ...navigationOptionsWithoutHeader,
        gesturesEnabled: false
      }
    },
    Slide: {
      screen: slideNavigator,
      navigationOptions: {
        ...navigationOptions,
        headerStyle: {
          ...navigationOptions.headerStyle,
          backgroundColor: HEADER_BACKGROUND_COLOR
        },
        headerTitle: HeaderSlideTitle,
        headerRight: <HeaderSlideRight />,
        gesturesEnabled: true
      }
    }
  },
  {
    initialRouteName: INITIAL_ROUTE_NAME,
    defaultNavigationOptions: {
      ...navigationOptions,
      gesturesEnabled: true
    }
  }
);

const defaultGetStateForAction = appNavigator.router.getStateForAction;

appNavigator.router.getStateForAction = (action: NavigationAction, state: ?NavigationState) => {
  const disabledScreens = ['Authentication', 'Home'];

  if (
    state &&
    action.type === NavigationActions.BACK &&
    disabledScreens.includes(state.routes[state.index].routeName)
  ) {
    // Block back action on Home and Authentication
    return null;
  }

  return defaultGetStateForAction(action, state);
};

export default appNavigator;
