import * as React from 'react';
import {StyleSheet, StatusBar, View, Animated, Easing} from 'react-native';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {WebView, WebViewNavigation} from 'react-native-webview';

import {StackScreenProps} from '@react-navigation/stack';
import theme from '../modules/theme';

import Screen from '../components/screen';
import {HEADER_BACKGROUND_COLOR} from '../navigator/navigation-options';
import Button from '../components/button';
import Loader from '../components/loader';
import {
  State as ExternalContentState,
  ExternalTypeState,
  initialState,
  getContentInfo,
  update,
  getRemoteCurrentProgressionId,
  completeProgressionAndPersist,
} from '../redux/external-content';
import translations from '../translations';
import {getBrand} from '../redux/utils/state-extract';
import type {State as BrandState} from '../redux/reducers/authentication/brand';
import {StoreState} from '../redux/store';

export type ConnectedStateProps = {
  externalContent: ExternalContentState;
  brand: BrandState;
};

export type ConnectedDispatchProps = {
  getContentInfo: typeof getContentInfo;
  getRemoteProgressionId: typeof getRemoteCurrentProgressionId;
  completeProgression: typeof completeProgressionAndPersist;
  updateExternalContentState: typeof update;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  browser: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
  },
  loader: {
    flex: 1,
    width: '100%',
    height: '100%',
    top: '53%',
    left: '55%',
    position: 'absolute',
    transform: [{translateY: -50}, {translateX: -50}],
  },
  footer: {
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.medium,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray.light,
  },
});

type Props = ConnectedStateProps &
  ConnectedDispatchProps &
  StackScreenProps<
    {
      ExternalContent: {
        contentRef: string;
        contentType: ExternalTypeState;
      };
      Modals: {screen: 'LevelEnd'; params: {isCorrect: boolean; progressionId: string}};
    },
    'ExternalContent'
  >;

const External: React.FC<Props> = ({
  route,
  navigation,
  externalContent,
  getContentInfo: getContentInfo_,
  updateExternalContentState,
  getRemoteProgressionId,
  completeProgression,
  brand,
}) => {
  const {contentRef, contentType} = route.params;
  const expectedContentUrl = `${brand?.host}/externalContent/${contentRef}`;
  const isEmptyUrl = externalContent.contentUrl === '';
  const isContentFinished = externalContent.contentStatus === 'finished';
  const animationValue = React.useRef(
    new Animated.Value(externalContent.validateButtonStatus === 'hidden' ? 0 : 104),
  ).current;

  const finishCourse = React.useCallback(() => {
    completeProgression(externalContent.progressionId, () => {
      const levelEndParams = {
        isCorrect: true,
        progressionId: externalContent.progressionId,
      };
      navigation.navigate('Modals', {screen: 'LevelEnd', params: levelEndParams});
    });
  }, [completeProgression, navigation, externalContent.progressionId]);

  function onDidFinishCourseButtonPress() {
    updateExternalContentState({contentStatus: 'finished', contentUrl: ''});
  }

  function onNavStateChange(navState: WebViewNavigation) {
    if (navState.url.startsWith(expectedContentUrl) && navState.url.endsWith('/end')) {
      updateExternalContentState({contentStatus: 'finished', contentUrl: ''});
    }
    if (navState.url.startsWith(expectedContentUrl)) {
      updateExternalContentState({webViewStatus: 'loaded'});
    }
  }

  React.useEffect(() => {
    updateExternalContentState({...initialState, contentType});
    return () => {
      updateExternalContentState(initialState);
    };
  }, [contentType, updateExternalContentState]);

  React.useEffect(() => {
    if (externalContent.webViewStatus === 'loaded') {
      getRemoteProgressionId(contentRef);
    }
  }, [getRemoteProgressionId, externalContent.webViewStatus, contentRef]);

  React.useEffect(() => {
    if (isContentFinished) {
      finishCourse();
    }
  }, [finishCourse, isContentFinished]);

  React.useEffect(() => {
    if (isEmptyUrl && !isContentFinished) {
      getContentInfo_(contentRef);
    }
  }, [getContentInfo_, contentRef, isEmptyUrl, isContentFinished]);

  React.useEffect(() => {
    const anim = Animated.timing(animationValue, {
      toValue: externalContent.validateButtonStatus === 'hidden' ? 0 : 104,
      easing: Easing.linear,
      duration: 230,
      useNativeDriver: false,
    });
    anim.start();
    return () => anim.stop();
  }, [animationValue, externalContent.validateButtonStatus]);

  return (
    <Screen noSafeArea noScroll testID="external-content-screen">
      <StatusBar barStyle="dark-content" backgroundColor={HEADER_BACKGROUND_COLOR} />

      <View style={styles.container}>
        {!isEmptyUrl ? (
          <WebView
            testID="external-content-webview"
            source={{uri: externalContent.contentUrl}}
            originWhitelist={['*']}
            allowsInlineMediaPlayback
            onNavigationStateChange={onNavStateChange}
            cacheEnabled={false}
            cacheMode="LOAD_NO_CACHE"
            incognito
            thirdPartyCookiesEnabled={false}
            style={styles.browser}
            containerStyle={styles.browser}
          />
        ) : null}
        {externalContent.webViewStatus !== 'loaded' || isContentFinished ? (
          <View style={styles.loaderContainer} testID="external-content-loader-container">
            <View style={styles.loader} testID="external-content-loader">
              <Loader />
            </View>
          </View>
        ) : null}
      </View>
      <Animated.View style={[styles.footer, {height: animationValue, opacity: animationValue}]}>
        <Button
          isLoading={isContentFinished}
          onPress={onDidFinishCourseButtonPress}
          isDisabled={externalContent.progressionId === ''}
          testID="external-content-button-finished-course"
          analyticsID="external-content-button-finished-course"
          analyticsParams={{questionType: `externalContent-${contentType}`}}
        >
          {translations.externalFinishCourse}
        </Button>
      </Animated.View>
    </Screen>
  );
};

const externalContentStateSelector = (state: StoreState) => state.externalContent;
const getExternalContentState = createSelector(
  [externalContentStateSelector],
  (externalContentState) => externalContentState,
);

export const mapStateToProps = (state: StoreState): ConnectedStateProps => ({
  externalContent: getExternalContentState(state),
  brand: getBrand(state),
});

export {External as Component};
export default connect(mapStateToProps, {
  getContentInfo,
  completeProgression: completeProgressionAndPersist,
  getRemoteProgressionId: getRemoteCurrentProgressionId,
  updateExternalContentState: update,
})(External);
