import * as React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {PortalProvider} from 'react-native-portal';
// @@todo wait for support tablet landscape orientation
// import DeviceInfo from 'react-native-device-info';
import orientation from 'react-native-orientation-locker';
import {ReduxNetworkProvider} from 'react-native-offline';
// @todo remove this lib once on react-native-firebase 6.x
import {setJSExceptionHandler, getJSExceptionHandler} from 'react-native-exception-handler';

import Navigator from './navigator';
import BrandThemeProvider from './components/brand-theme-provider';
import UserProvider from './components/user-provider';
import VersionListener from './containers/version-listener';
import VideoFullscreenListener from './containers/video-fullscreen-listener';
import ConnectionListener from './containers/connection-listener';
import createDataLayer from './layer/data';
import createServices from './services';
import createStore from './redux';
import type {ReduxDevTools} from './redux/_types';

const reduxDevTools: ReduxDevTools | void =
  // @ts-ignore
  window && window.__REDUX_DEVTOOLS_EXTENSION__
    ? // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;

const dataLayer = createDataLayer();

const services = createServices(dataLayer);
// @ts-ignore
const store = createStore(services, reduxDevTools);

interface Props {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ENABLE_ERROR_DEBUG = false;

class App extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    const currentHandler = getJSExceptionHandler();
    setJSExceptionHandler((error, isFatal) => {
      if (!error) {
        return;
      }

      services.Logger.error(error);
      currentHandler(error, isFatal);
    }, ENABLE_ERROR_DEBUG);
  }

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
        <ReduxNetworkProvider pingInterval={30000} pingOnlyIfOffline>
          <PortalProvider>
            <VersionListener />
            <UserProvider>
              <BrandThemeProvider>
                <View style={styles.container}>
                  <Navigator />
                </View>
              </BrandThemeProvider>
            </UserProvider>
            <ConnectionListener />
            {Platform.OS === 'android' ? <VideoFullscreenListener /> : null}
          </PortalProvider>
        </ReduxNetworkProvider>
      </Provider>
    );
  }
}

export default App;
