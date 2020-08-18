import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import navigationOptions, {
  HEADER_HEIGHT,
  SETTINGS_SCREEN_HEADER_BACKGROUND_COLOR,
} from '../navigator/navigation-options';
import {getStatusBarHeight} from '../modules/status-bar';
import Touchable from '../components/touchable';
import Text from '../components/text';
import theme, {getHitSlop} from '../modules/theme';
import HeaderBackButton, {SPACING as ICON_SPACING} from '../components/header-back-button';
import {useBackHandler} from './with-backhandler';

const SIDE_WIDTH = 20 + ICON_SPACING;

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT + getStatusBarHeight(),
  },
  header: {
    ...navigationOptions.headerStyle,
    backgroundColor: SETTINGS_SCREEN_HEADER_BACKGROUND_COLOR,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: HEADER_HEIGHT + getStatusBarHeight(),
    paddingTop: getStatusBarHeight(),
  },
  side: {
    width: SIDE_WIDTH,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    padding: theme.spacing.small,
  },
  title: {
    fontSize: theme.fontSize.large,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray.dark,
  },
});

type Props = StackScreenProps<
  {
    Browser: {url: string};
  },
  'Browser'
>;

const BrowserHeader = (props: Props): React.ReactNode => {
  function handleGoBack() {
    props.navigation.goBack();
    return true;
  }

  useBackHandler(handleGoBack);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.side}>
          <Touchable
            hitSlop={getHitSlop()}
            onPress={handleGoBack}
            testID="browser-header-close"
            analyticsID="browser-header-close"
          >
            <HeaderBackButton
              isFloating={false}
              color={theme.colors.gray.dark}
              testID="browser-close-icon"
              onPress={handleGoBack}
              type="close"
            />
          </Touchable>
        </View>
        <View style={styles.center}>
          <Text style={styles.title} numberOfLines={1}>
            {props.scene?.route?.params.url}
          </Text>
        </View>
        <View style={styles.side} />
      </View>
    </View>
  );
};

export default BrowserHeader;
