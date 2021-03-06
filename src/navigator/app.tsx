import * as React from 'react';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';

import QuestionHeader from '../containers/question-header';
import SettingsHeader from '../containers/settings-header';
import DynamicLinks from '../containers/dynamic-links';
import DeepLinks from '../containers/deep-links';
import HomeScreen from '../screens/home';
import AuthenticationScreen from '../screens/authentication';
import AuthenticationDetailsScreen from '../screens/authentication-details';
import SearchScreen from '../screens/search';
import ExternalContentScreen from '../screens/external-content';
import SettingsScreen from '../screens/settings';
import ExternalContentHeader from '../containers/external-content-header';
import SlidesNavigator from './slide';
import navigationOptions, {
  navigationOptionsWithoutHeader,
  HEADER_BACKGROUND_COLOR,
  INITIAL_ROUTE_NAME,
} from './navigation-options';

const Stack = createStackNavigator();

function AuthenticationWithDynamicLinks(mainProps) {
  return (
    <DynamicLinks {...mainProps}>
      <DeepLinks {...mainProps}>
        <AuthenticationScreen {...mainProps} />
      </DeepLinks>
    </DynamicLinks>
  );
}

const cardTransitionAnimation = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default function AppNavigator(): React.ReactNode {
  return (
    <Stack.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      headerMode="screen"
      screenOptions={{
        ...navigationOptions,
        ...cardTransitionAnimation,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="Authentication"
        component={AuthenticationWithDynamicLinks}
        options={{
          ...navigationOptionsWithoutHeader,
          ...cardTransitionAnimation,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="AuthenticationDetails"
        component={AuthenticationDetailsScreen}
        options={{
          ...navigationOptionsWithoutHeader,
          ...cardTransitionAnimation,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          ...navigationOptionsWithoutHeader,
          ...cardTransitionAnimation,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Slide"
        component={SlidesNavigator}
        options={{
          ...navigationOptions,
          ...cardTransitionAnimation,
          headerStyle: {
            ...navigationOptions.headerStyle,
            backgroundColor: HEADER_BACKGROUND_COLOR,
          },
          header: QuestionHeader,
          gestureEnabled: true,
        }}
      />

      <Stack.Screen
        name="ExternalContent"
        component={ExternalContentScreen}
        options={{
          ...navigationOptions,
          ...cardTransitionAnimation,
          headerStyle: {
            ...navigationOptions.headerStyle,
            backgroundColor: HEADER_BACKGROUND_COLOR,
          },
          header: ExternalContentHeader,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          ...navigationOptionsWithoutHeader,
          ...cardTransitionAnimation,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          ...navigationOptions,
          ...cardTransitionAnimation,
          header: SettingsHeader,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
