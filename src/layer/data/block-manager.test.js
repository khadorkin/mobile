// @flow strict
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import {store} from './block-manager';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

describe('block-manager', () => {
  it('should merge items being stored at the same time in the same block', async () => {
    const itemsStep1 = {
      a: {id: 'a'},
      b: {id: 'b'},
      c: {id: 'c'}
    };

    const itemsStep2 = {
      a: {id: 'a'},
      d: {id: 'd'}
    };

    await Promise.all([store('cards', itemsStep1), store('cards', itemsStep2)]);

    // $FlowFixMe
    const cards = await mockAsyncStorage.getItem('cards-1');
    expect(cards).toEqual('{"a":{"id":"a"},"b":{"id":"b"},"c":{"id":"c"},"d":{"id":"d"}}');

    // $FlowFixMe
    const metadata = await mockAsyncStorage.getItem('metadata');
    expect(metadata).toEqual({
      cards: {currentNum: 1}
    });
  });
});
