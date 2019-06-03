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
import BrandThemeProvider from './components/brand-theme-provider';
import AnalyticsProvider from './components/analytics-provider';
import VersionListener from './containers/version-listener';
import VideoFullscreenListener from './containers/video-fullscreen-listener';
import createDataLayer from './layer/data';
import createServices from './services';
import createStore from './redux';
import type {ReduxDevTools} from './redux/_types';
import {PersistGate} from 'redux-persist/integration/react';

const reduxDevTools: ReduxDevTools | void =
  // eslint-disable-next-line no-undef
  window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined;

const dataLayer = createDataLayer(translations.getLanguage());
const services = createServices(dataLayer);
const {store, persistor} = createStore(services, reduxDevTools);

type Props = {||};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class App extends React.PureComponent<Props> {
  props: Props;

  componentDidMount() {
    orientation.lockToPortrait();
    // @@todo wait for support tablet landscape orientation
    // if (DeviceInfo.isTablet()) {
    //   orientation.unlockAllOrientations();
    // }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AnalyticsProvider>
            <PortalProvider>
              <VersionListener />
              <BrandThemeProvider>
                <View style={styles.container}>
                  <Navigator />
                </View>
              </BrandThemeProvider>
              {Platform.OS === 'android' && <VideoFullscreenListener />}
            </PortalProvider>
          </AnalyticsProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
