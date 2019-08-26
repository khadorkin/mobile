// @flow

import * as React from 'react';
import renderer from 'react-test-renderer';

import {assistanceEmail} from '../../app';
import {handleFakePress} from '../utils/tests';
import {ERROR_TYPE, CONTENT_TYPE, ENGINE} from '../const';
import {createErrorState, createStoreState} from '../__fixtures__/store';
import {createProgression} from '../__fixtures__/progression';
import {Component as ErrorListener, mapStateToProps} from './error-listener';
import type {ConnectedStateProps} from './error-listener';

describe('ErrorListener', () => {
  it('should handle assistance press', () => {
    const {Linking} = require('react-native');
    const lastAction = jest.fn();
    const hideModal = jest.fn();
    const refresh = jest.fn();
    const signOut = jest.fn();

    const component = renderer.create(
      <ErrorListener
        isVisible
        errorType={ERROR_TYPE.NO_CONTENT_FOUND}
        lastAction={lastAction}
        hideModal={hideModal}
        refresh={refresh}
        signOut={signOut}
        onClose={handleFakePress}
      />
    );

    const modal = component.root.find(el => el.props.testID === 'error-modal');
    modal.props.onAssistancePress();

    expect(Linking.openURL).toHaveBeenCalledTimes(1);
    expect(Linking.openURL).toHaveBeenCalledWith(`mailto:${assistanceEmail}`);
  });

  it('should handle close on component', () => {
    const lastAction = jest.fn();
    const hideModal = jest.fn();
    const refresh = jest.fn();
    const signOut = jest.fn();
    const handleClose = jest.fn();

    const component = renderer.create(
      <ErrorListener
        isVisible
        errorType={ERROR_TYPE.NO_CONTENT_FOUND}
        lastAction={lastAction}
        hideModal={hideModal}
        refresh={refresh}
        signOut={signOut}
        onClose={handleClose}
      />
    );

    const modal = component.root.find(el => el.props.testID === 'error-modal');
    modal.props.onClose();

    expect(hideModal).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should handle close on component', () => {
    const lastAction = jest.fn();
    const hideModal = jest.fn();
    const refresh = jest.fn();
    const signOut = jest.fn();
    const handleClose = jest.fn();

    const component = renderer.create(
      <ErrorListener
        isVisible
        errorType={ERROR_TYPE.NO_CONTENT_FOUND}
        lastAction={lastAction}
        hideModal={hideModal}
        refresh={refresh}
        signOut={signOut}
        onClose={handleClose}
      />
    );

    const modal = component.root.find(el => el.props.testID === 'modal');
    modal.props.onSwipeComplete();

    expect(hideModal).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should handle close on swipe', () => {
    const lastAction = jest.fn();
    const hideModal = jest.fn();
    const refresh = jest.fn();
    const signOut = jest.fn();
    const handleClose = jest.fn();

    const component = renderer.create(
      <ErrorListener
        isVisible
        errorType={ERROR_TYPE.NO_CONTENT_FOUND}
        lastAction={lastAction}
        hideModal={hideModal}
        refresh={refresh}
        signOut={signOut}
        onClose={handleClose}
      />
    );

    const modal = component.root.find(el => el.props.testID === 'modal');
    modal.props.onBackdropPress();

    expect(hideModal).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should handle refresh', () => {
    const lastAction = jest.fn();
    const hideModal = jest.fn();
    const refresh = jest.fn();
    const signOut = jest.fn();
    const handleClose = jest.fn();

    const component = renderer.create(
      <ErrorListener
        isVisible
        errorType={ERROR_TYPE.NO_CONTENT_FOUND}
        lastAction={lastAction}
        hideModal={hideModal}
        refresh={refresh}
        signOut={signOut}
        onClose={handleClose}
      />
    );

    const modal = component.root.find(el => el.props.testID === 'error-modal');
    modal.props.onRefresh();

    expect(refresh).toHaveBeenCalledTimes(1);
  });

  describe('mapStateToProps', () => {
    it('should get all props', () => {
      const lastAction = jest.fn();
      const isVisible = true;
      const errorType = ERROR_TYPE.NO_CONTENT_FOUND;
      const error = createErrorState({
        isVisible,
        errorType,
        lastAction
      });
      const levelRef = 'dummyRef';
      const progression = createProgression({
        engine: ENGINE.MICROLEARNING,
        progressionContent: {
          type: CONTENT_TYPE.LEVEL,
          ref: levelRef
        }
      });

      const mockedStore = createStoreState({
        levels: [],
        disciplines: [],
        chapters: [],
        slides: [],
        progression,
        error
      });

      const result = mapStateToProps(mockedStore);
      const expected: ConnectedStateProps = {
        isVisible,
        errorType,
        lastAction
      };

      expect(result).toEqual(expected);
    });
  });
});
