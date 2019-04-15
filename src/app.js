// @flow

import * as React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {PortalProvider} from 'react-native-portal';
// @@todo wait for support tablet landscape orientation
// import DeviceInfo from 'react-native-device-info';
import orientation from 'react-native-orientation-locker';

import translations from './translations';
import Navigator from './navigator';
import {INITIAL_ROUTE_NAME} from './navigator/navigation-options';
import BrandThemeProvider from './components/brand-theme-provider';
import AnalyticsProvider from './components/analytics-provider';
import NetworkInfoListener from './containers/network-info-listener';
import VersionListener from './containers/version-listener';
import VideoFullscreenListener from './containers/video-fullscreen-listener';
import createDataLayer from './layer/data';
import createServices from './services';
import createStore from './redux';
import type {ReduxDevTools} from './redux/_types';

const reduxDevTools: ReduxDevTools | void =
  // eslint-disable-next-line no-undef
  window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined;

const dataLayer = createDataLayer(translations.getLanguage());
const services = createServices(dataLayer);
const store = createStore(services, reduxDevTools);

type Props = {||};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class App extends React.PureComponent<Props> {
  props: Props;

  componentDidMount() {
    services.Analytics.setCurrentScreen(INITIAL_ROUTE_NAME);
    orientation.lockToPortrait();
    // @@todo wait for support tablet landscape orientation
    // if (DeviceInfo.isTablet()) {
    //   orientation.unlockAllOrientations();
    // }
  }

  render() {
    return (
      <Provider store={store}>
        <AnalyticsProvider>
          <PortalProvider>
            <VersionListener />
            <NetworkInfoListener />
            <BrandThemeProvider>
              <View style={styles.container}>
                <Navigator />
              </View>
            </BrandThemeProvider>
            {Platform.OS === 'android' && <VideoFullscreenListener />}
          </PortalProvider>
        </AnalyticsProvider>
      </Provider>
    );
  }
}

export default App;
