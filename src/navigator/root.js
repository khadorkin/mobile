// @flow strict

import {createStackNavigator} from 'react-navigation';

import QRCodeScreen from '../screens/qr-code';
import appNavigator from './app';
import {slideModalsNavigator} from './slide';
import pdfNavigator from './pdf';
import browserNavigator from './browser';
import {navigationOptionsWithoutHeader, INITIAL_APP_ROUTE_NAME} from './navigation-options';

const navigator = createStackNavigator(
  {
    App: {screen: appNavigator},
    SlideModal: {screen: slideModalsNavigator},
    PdfModal: {screen: pdfNavigator},
    BrowserModal: {screen: browserNavigator},
    QRCodeModal: {screen: QRCodeScreen}
  },
  {
    initialRouteName: INITIAL_APP_ROUTE_NAME,
    defaultNavigationOptions: navigationOptionsWithoutHeader,
    headerMode: 'none',
    mode: 'modal'
  }
);

export default navigator;
