import * as React from 'react';
import renderer from 'react-test-renderer';

import {createNavigation} from '../__fixtures__/navigation';
import {createAuthenticationState} from '../__fixtures__/store';
import {createBrand} from '../__fixtures__/brands';
import type {State as ExternalContentState} from '../redux/external-content';
import {mapStateToProps} from './external-content';
import type {ConnectedStateProps} from './external-content';

describe('ExternalContent', () => {
  it('should return the accurate props', () => {
    const brand = createBrand();
    const authentication = createAuthenticationState({brand});
    const externalContent: ExternalContentState = {
      contentStatus: 'started',
      contentUrl: 'https://content.coorpacademy.com/extCont_123',
      webViewStatus: 'loaded',
      progressionId: '53f1c2d19e932',
      validateButtonVisibility: 'visible',
      validateButtonStatus: 'inactive',
      contentType: 'video',
    };

    const store = {
      externalContent,
      authentication,
    };

    const result = mapStateToProps(store);
    const expected: ConnectedStateProps = {
      brand,
      externalContent,
    };
    expect(result).toEqual(expected);
  });

  it('sets the state to its initial value when view is unmounted', () => {
    const {Component: ExternalContent} = require('./external-content');

    const navigation = createNavigation({});
    const route = {
      params: {
        contentRef: 'extCont_123',
        contentType: 'video',
      },
    };
    const brand = createBrand();
    const updateExternalContentState = jest.fn();
    const getContentInfo = jest.fn();
    const completeProgression = jest.fn();
    const getRemoteProgressionId = jest.fn();
    const externalContent: ExternalContentState = {
      contentStatus: 'started',
      contentUrl: 'https://mobile-staging.coorpacademy.com/externalContent/extCont_123',
      webViewStatus: 'loaded',
      progressionId: '53f32fe5cd234',
      validateButtonVisibility: 'visible',
      validateButtonStatus: 'inactive',
      contentType: 'scorm',
    };

    const component = renderer.create(
      <ExternalContent
        navigation={navigation}
        route={route}
        externalContent={externalContent}
        brand={brand}
        updateExternalContentState={updateExternalContentState}
        getContentInfo={getContentInfo}
        completeProgression={completeProgression}
        getRemoteProgressionId={getRemoteProgressionId}
      />,
    );

    component.unmount();

    expect(updateExternalContentState).toBeCalledTimes(1);
    expect(updateExternalContentState).nthCalledWith(1, {
      contentStatus: 'idle',
      contentUrl: '',
      webViewStatus: 'idle',
      progressionId: '',
      validateButtonVisibility: 'visible',
      validateButtonStatus: 'inactive',
      contentType: 'idle',
    });
    expect(getContentInfo).toBeCalledTimes(1);
    expect(getRemoteProgressionId).toBeCalledTimes(1);
    expect(completeProgression).toBeCalledTimes(0);
  });

  it('shows the loader if current content has been finished', () => {
    const {Component: ExternalContent} = require('./external-content');

    const navigation = createNavigation({});
    const route = {
      params: {
        contentRef: 'extCont_123',
        contentType: 'podcast',
      },
    };
    const brand = createBrand();
    const updateExternalContentState = jest.fn();
    const getContentInfo = jest.fn();
    const completeProgression = jest.fn();
    const getRemoteProgressionId = jest.fn();
    const externalContent: ExternalContentState = {
      contentStatus: 'finished',
      contentUrl: 'https://mobile-staging.coorpacademy.com/login/extCont_123',
      webViewStatus: 'loaded',
      progressionId: '53f32fe5cd234',
      validateButtonVisibility: 'visible',
      validateButtonStatus: 'inactive',
      contentType: 'podcast',
    };

    const component = renderer.create(
      <ExternalContent
        navigation={navigation}
        route={route}
        externalContent={externalContent}
        brand={brand}
        updateExternalContentState={updateExternalContentState}
        getContentInfo={getContentInfo}
        completeProgression={completeProgression}
        getRemoteProgressionId={getRemoteProgressionId}
      />,
    );

    const webView = component.root.find((el) => el.props.testID === 'external-content-webview');
    webView.props.onNavigationStateChange({
      url: 'https://mobile-staging.coorpacademy.com/login/extCont_123',
    });

    expect(getContentInfo).toBeCalledTimes(0);
    expect(getRemoteProgressionId).toBeCalledTimes(1);
    expect(completeProgression).toBeCalledTimes(1);
  });

  it('triggers the action to get the contentUrl when its empty', () => {
    const {Component: ExternalContent} = require('./external-content');

    const navigation = createNavigation({});
    const route = {
      params: {
        contentRef: 'extCont_123',
        contentType: 'video',
      },
    };
    const brand = createBrand();
    const updateExternalContentState = jest.fn();
    const getContentInfo = jest.fn();
    const completeProgression = jest.fn();
    const getRemoteProgressionId = jest.fn();
    const externalContent: ExternalContentState = {
      contentStatus: 'idle',
      contentUrl: '',
      webViewStatus: 'idle',
      progressionId: '',
      validateButtonVisibility: 'visible',
      validateButtonStatus: 'inactive',
      contentType: 'video',
    };

    renderer.create(
      <ExternalContent
        navigation={navigation}
        route={route}
        externalContent={externalContent}
        brand={brand}
        updateExternalContentState={updateExternalContentState}
        getContentInfo={getContentInfo}
        completeProgression={completeProgression}
        getRemoteProgressionId={getRemoteProgressionId}
      />,
    );

    expect(getContentInfo).toBeCalledTimes(1);
    expect(getRemoteProgressionId).toBeCalledTimes(0);
    expect(completeProgression).toBeCalledTimes(0);
  });

  it('triggers the action to get the remote progression when contentUrl matches the right content url', () => {
    const {Component: ExternalContent} = require('./external-content');

    const navigation = createNavigation({});
    const route = {
      params: {
        contentRef: 'extCont_123',
        contentType: 'video',
      },
    };
    const brand = createBrand();
    const updateExternalContentState = jest.fn();
    const getContentInfo = jest.fn();
    const completeProgression = jest.fn();
    const getRemoteProgressionId = jest.fn();
    const externalContent: ExternalContentState = {
      contentStatus: 'started',
      contentUrl: 'https://mobile-staging.coorpacademy.com/externalContent/extCont_123',
      webViewStatus: 'loaded',
      progressionId: '',
      validateButtonVisibility: 'visible',
      validateButtonStatus: 'inactive',
      contentType: 'video',
    };

    const component = renderer.create(
      <ExternalContent
        navigation={navigation}
        route={route}
        externalContent={externalContent}
        brand={brand}
        updateExternalContentState={updateExternalContentState}
        getContentInfo={getContentInfo}
        completeProgression={completeProgression}
        getRemoteProgressionId={getRemoteProgressionId}
      />,
    );

    component.update(
      <ExternalContent
        navigation={navigation}
        route={route}
        externalContent={{...externalContent, webViewStatus: 'loaded'}}
        brand={brand}
        updateExternalContentState={updateExternalContentState}
        getContentInfo={getContentInfo}
        completeProgression={completeProgression}
        getRemoteProgressionId={getRemoteProgressionId}
      />,
    );

    const webView = component.root.find((el) => el.props.testID === 'external-content-webview');
    webView.props.onNavigationStateChange({
      url: 'https://mobile-staging.coorpacademy.com/externalContent/extCont_123',
    });

    expect(getContentInfo).toBeCalledTimes(1);
    expect(getRemoteProgressionId).toBeCalledTimes(1);
    expect(completeProgression).toBeCalledTimes(0);
  });

  it('finishes the course on button press', () => {
    const {Component: ExternalContent} = require('./external-content');

    const navigation = createNavigation({});
    const route = {
      params: {
        contentRef: 'extCont_123',
        contentType: 'video',
      },
    };
    const brand = createBrand();
    const updateExternalContentState = jest.fn();
    const getContentInfo = jest.fn();
    const completeProgression = jest.fn((progressionId: string, callback: () => void) => {
      return callback();
    });
    const getRemoteProgressionId = jest.fn();
    const externalContent: ExternalContentState = {
      contentStatus: 'finished',
      contentUrl: 'https://mobile-staging.coorpacademy.com/externalContent/extCont_123/end',
      webViewStatus: 'loaded',
      progressionId: '53f1c2d19e932',
      validateButtonVisibility: 'visible',
      validateButtonStatus: 'inactive',
      contentType: 'video',
    };

    const component = renderer.create(
      <ExternalContent
        navigation={navigation}
        route={route}
        externalContent={externalContent}
        brand={brand}
        updateExternalContentState={updateExternalContentState}
        getContentInfo={getContentInfo}
        completeProgression={completeProgression}
        getRemoteProgressionId={getRemoteProgressionId}
      />,
    );

    const button = component.root.find(
      (el) => el.props.testID === 'external-content-button-finished-course',
    );
    button.props.onPress();

    expect(navigation.navigate).toBeCalledTimes(1);
    expect(updateExternalContentState).toBeCalledTimes(1);
    expect(getContentInfo).toBeCalledTimes(0);
    expect(getRemoteProgressionId).toBeCalledTimes(1);
    expect(completeProgression).toBeCalledTimes(1);
  });

  it('finishes the course if contentUrl matches the right content url and ends with /end', () => {
    const {Component: ExternalContent} = require('./external-content');

    const navigation = createNavigation({});
    const route = {
      params: {
        contentRef: 'extCont_123',
        contentType: 'scorm',
      },
    };
    const brand = createBrand();

    const updateExternalContentState = jest.fn();
    const getContentInfo = jest.fn();
    const completeProgression = jest.fn((progressionId: string, callback: () => void) => {
      return callback();
    });
    const getRemoteProgressionId = jest.fn();

    const component = renderer.create(
      <ExternalContent
        navigation={navigation}
        route={route}
        externalContent={{
          validateButtonVisibility: 'hidden',
          validateButtonStatus: 'inactive',
          contentType: 'scorm',
          contentUrl: 'https://mobile-staging.coorpacademy.com/externalContent/',
          contentStatus: 'started',
          webViewStatus: 'loaded',
          progressionId: '',
        }}
        brand={brand}
        updateExternalContentState={updateExternalContentState}
        getContentInfo={getContentInfo}
        completeProgression={completeProgression}
        getRemoteProgressionId={getRemoteProgressionId}
      />,
    );

    const webView = component.root.find((el) => el.props.testID === 'external-content-webview');
    webView.props.onNavigationStateChange({
      url: 'https://mobile-staging.coorpacademy.com/externalContent/extCont_123/end',
    });

    component.update(
      <ExternalContent
        navigation={navigation}
        route={route}
        externalContent={{
          validateButtonVisibility: 'hidden',
          validateButtonStatus: 'inactive',
          contentType: 'scorm',
          contentUrl: 'https://mobile-staging.coorpacademy.com/externalContent/extCont_123/end',
          contentStatus: 'finished',
          webViewStatus: 'loaded',
          progressionId: '435ger52',
        }}
        brand={brand}
        updateExternalContentState={updateExternalContentState}
        getContentInfo={getContentInfo}
        completeProgression={completeProgression}
        getRemoteProgressionId={getRemoteProgressionId}
      />,
    );

    expect(navigation.navigate).toBeCalledTimes(1);
    expect(getContentInfo).toBeCalledTimes(1);
    expect(getRemoteProgressionId).toBeCalledTimes(1);
    expect(completeProgression).toBeCalledTimes(1);
  });

  it('does not activate the finish course button if the posted message has not the lesson_status', () => {
    const {Component: ExternalContent} = require('./external-content');

    const navigation = createNavigation({});
    const route = {
      params: {
        contentRef: 'extCont_123',
        contentType: 'scorm',
      },
    };
    const brand = createBrand();

    const updateExternalContentState = jest.fn();
    const getContentInfo = jest.fn();
    const completeProgression = jest.fn((progressionId: string, callback: () => void) => {
      return callback();
    });
    const getRemoteProgressionId = jest.fn();

    const component = renderer.create(
      <ExternalContent
        navigation={navigation}
        route={route}
        externalContent={{
          validateButtonVisibility: 'visible',
          validateButtonStatus: 'inactive',
          contentType: 'scorm',
          contentUrl: 'https://mobile-staging.coorpacademy.com/externalContent/',
          contentStatus: 'started',
          webViewStatus: 'loaded',
          progressionId: '12345',
        }}
        brand={brand}
        updateExternalContentState={updateExternalContentState}
        getContentInfo={getContentInfo}
        completeProgression={completeProgression}
        getRemoteProgressionId={getRemoteProgressionId}
      />,
    );

    const webView = component.root.find((el) => el.props.testID === 'external-content-webview');
    webView.props.onMessage({
      nativeEvent: {
        data: null,
      },
    });

    expect(getContentInfo).toBeCalledTimes(0);
    expect(updateExternalContentState).toBeCalledTimes(0);
  });

  it('activates finish course button if the posted message has the lesson_status property set to completed', () => {
    const {Component: ExternalContent} = require('./external-content');

    const navigation = createNavigation({});
    const route = {
      params: {
        contentRef: 'extCont_123',
        contentType: 'scorm',
      },
    };
    const brand = createBrand();

    const updateExternalContentState = jest.fn();
    const getContentInfo = jest.fn();
    const completeProgression = jest.fn((progressionId: string, callback: () => void) => {
      return callback();
    });
    const getRemoteProgressionId = jest.fn();

    const component = renderer.create(
      <ExternalContent
        navigation={navigation}
        route={route}
        externalContent={{
          validateButtonVisibility: 'visible',
          validateButtonStatus: 'inactive',
          contentType: 'scorm',
          contentUrl: 'https://mobile-staging.coorpacademy.com/externalContent/',
          contentStatus: 'started',
          webViewStatus: 'loaded',
          progressionId: '12345',
        }}
        brand={brand}
        updateExternalContentState={updateExternalContentState}
        getContentInfo={getContentInfo}
        completeProgression={completeProgression}
        getRemoteProgressionId={getRemoteProgressionId}
      />,
    );

    const webView = component.root.find((el) => el.props.testID === 'external-content-webview');
    webView.props.onMessage({
      nativeEvent: {
        data:
          '{"lesson_status":"completed","score_raw":"","score_max":100,"score_min":0,"session_time":"00:00:39.97","detailed_answers":{},"progressionId":"5fc797ec5c47e1001b77af1b"}',
      },
    });

    expect(getContentInfo).toBeCalledTimes(0);
    expect(updateExternalContentState).toBeCalledTimes(1);
    expect(updateExternalContentState).nthCalledWith(1, {validateButtonStatus: 'active'});
  });
});
