import * as React from 'react';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';
import {createNavigation} from '../__fixtures__/navigation';

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  addEventListener: jest.fn((evt, cb) =>
    cb({url: 'https://mob.coorpacademy.com/dashboard?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'}),
  ),
  removeEventListener: jest.fn((evt, cb) =>
    cb({url: 'https://mob.coorpacademy.com/dashboard?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'}),
  ),
}));

describe('DeepLink', () => {
  it('has correct props', () => {
    const {mapStateToProps} = require('./deep-links');
    const token = 'eyHT3iUFEIN3R';

    const state = {authentication: {token}};
    const result = mapStateToProps(state);

    expect(result).toEqual({token});
  });

  it('handles deep linking', () => {
    const {Component: DeepLinks} = require('./deep-links');

    const signIn = jest.fn();
    const signOut = jest.fn();
    const token = 'eyHT3iUFEIN3R';
    const navigation = createNavigation({});

    renderer.create(
      <DeepLinks signOut={signOut} signIn={signIn} token={token} navigation={navigation}>
        <Text>Hello</Text>
      </DeepLinks>,
    );

    expect(signOut).toHaveBeenCalledTimes(0);
    expect(signIn).toHaveBeenCalledTimes(0);
    expect(navigation.navigate).toHaveBeenCalledTimes(0);
  });
});
