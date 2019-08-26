// @flow strict
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import _ from 'lodash';
import {store} from './block-manager';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

const fillBlock = (blockKey, nb) => {
  const storedItems = _.range(nb).reduce(
    (acc, i) => ({
      ...acc,
      [i]: {id: i}
    }),
    {}
  );

  return store(blockKey, storedItems);
};

describe('block-manager', () => {
  describe('store', () => {
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

    it('should create a new block when the current one is full', async () => {
      // $FlowFixMe
      await mockAsyncStorage.clear();
      await fillBlock('cards', 15);

      const newItems = {
        a: {id: 'a'},
        b: {id: 'b'},
        c: {id: 'c'},
        d: {id: 'd'},
        e: {id: 'e'},
        f: {id: 'f'}
      };

      await store('cards', newItems);

      // $FlowFixMe
      const cards1 = await mockAsyncStorage.getItem('cards-1');
      // $FlowFixMe
      const cards2 = await mockAsyncStorage.getItem('cards-2');

      expect(cards1).toEqual(
        '{"0":{"id":0},"1":{"id":1},"2":{"id":2},"3":{"id":3},"4":{"id":4},"5":{"id":5},"6":{"id":6},"7":{"id":7},"8":{"id":8},"9":{"id":9},"10":{"id":10},"11":{"id":11},"12":{"id":12},"13":{"id":13},"14":{"id":14},"a":{"id":"a"},"b":{"id":"b"},"c":{"id":"c"},"d":{"id":"d"},"e":{"id":"e"}}'
      );
      expect(cards2).toEqual('{"f":{"id":"f"}}');

      // $FlowFixMe
      const metadata = await mockAsyncStorage.getItem('metadata');
      expect(metadata).toEqual({
        cards: {currentNum: 2}
      });
    });

    it('should create a many blocks when the current one is full and (nb items > limit by block)', async () => {
      // $FlowFixMe
      await mockAsyncStorage.clear();
      await fillBlock('cards', 20);

      const newItems = _.range(20, 50).reduce(
        (acc, i) => ({
          ...acc,
          [i]: {id: i}
        }),
        {}
      );

      await store('cards', newItems);

      // $FlowFixMe
      const cards3 = await mockAsyncStorage.getItem('cards-3');

      expect(cards3).toEqual(
        '{"40":{"id":40},"41":{"id":41},"42":{"id":42},"43":{"id":43},"44":{"id":44},"45":{"id":45},"46":{"id":46},"47":{"id":47},"48":{"id":48},"49":{"id":49}}'
      );

      // $FlowFixMe
      const metadata = await mockAsyncStorage.getItem('metadata');
      expect(metadata).toEqual({
        cards: {currentNum: 3}
      });
    });
  });
});
