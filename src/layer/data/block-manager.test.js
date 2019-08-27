// @flow strict
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import _ from 'lodash';
import {BLOCK_TYPES, getItem, store} from './block-manager';

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

      await Promise.all([
        store(BLOCK_TYPES.CARDS, itemsStep1),
        store(BLOCK_TYPES.CARDS, itemsStep2)
      ]);

      // $FlowFixMe
      const cards = await mockAsyncStorage.getItem('cards-1');
      expect(cards).toEqual('{"a":{"id":"a"},"b":{"id":"b"},"c":{"id":"c"},"d":{"id":"d"}}');

      // $FlowFixMe
      const metadata = await mockAsyncStorage.getItem(BLOCK_TYPES.METADATA);
      expect(metadata).toEqual(
        '{"cards":{"currentNum":1,"keyMap":{"a":"cards-1","b":"cards-1","c":"cards-1","d":"cards-1"}}}'
      );
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

      await store(BLOCK_TYPES.CARDS, newItems);

      // $FlowFixMe
      const cards1 = await mockAsyncStorage.getItem('cards-1');
      // $FlowFixMe
      const cards2 = await mockAsyncStorage.getItem('cards-2');

      expect(cards1).toEqual(
        '{"0":{"id":0},"1":{"id":1},"2":{"id":2},"3":{"id":3},"4":{"id":4},"5":{"id":5},"6":{"id":6},"7":{"id":7},"8":{"id":8},"9":{"id":9},"10":{"id":10},"11":{"id":11},"12":{"id":12},"13":{"id":13},"14":{"id":14},"a":{"id":"a"},"b":{"id":"b"},"c":{"id":"c"},"d":{"id":"d"},"e":{"id":"e"}}'
      );
      expect(cards2).toEqual('{"f":{"id":"f"}}');

      // $FlowFixMe
      const metadata = await mockAsyncStorage.getItem(BLOCK_TYPES.METADATA);
      expect(metadata).toEqual(
        '{"cards":{"currentNum":2,"keyMap":{"0":"cards-1","1":"cards-1","2":"cards-1","3":"cards-1","4":"cards-1","5":"cards-1","6":"cards-1","7":"cards-1","8":"cards-1","9":"cards-1","10":"cards-1","11":"cards-1","12":"cards-1","13":"cards-1","14":"cards-1","a":"cards-1","b":"cards-1","c":"cards-1","d":"cards-1","e":"cards-1","f":"cards-2"}}}'
      );
    });

    it('should not add items if already stored in a previous block', async () => {
      // $FlowFixMe
      await mockAsyncStorage.clear();
      await fillBlock('cards', 15);

      const newItems = {
        a: {id: 'a'},
        b: {id: 'b'},
        c: {id: 'c'},
        d: {id: 'd'},
        e: {id: 'e'},
        '1': {id: 1},
        '2': {id: 2},
        '3': {id: 3},
        '4': {id: 4},
        f: {id: 'f'}
      };

      await store(BLOCK_TYPES.CARDS, newItems);

      // $FlowFixMe
      const cards1 = await mockAsyncStorage.getItem('cards-1');
      // $FlowFixMe
      const cards2 = await mockAsyncStorage.getItem('cards-2');

      expect(cards1).toEqual(
        '{"0":{"id":0},"1":{"id":1},"2":{"id":2},"3":{"id":3},"4":{"id":4},"5":{"id":5},"6":{"id":6},"7":{"id":7},"8":{"id":8},"9":{"id":9},"10":{"id":10},"11":{"id":11},"12":{"id":12},"13":{"id":13},"14":{"id":14},"a":{"id":"a"},"b":{"id":"b"},"c":{"id":"c"},"d":{"id":"d"},"e":{"id":"e"}}'
      );
      expect(cards2).toEqual('{"f":{"id":"f"}}');

      // $FlowFixMe
      const metadata = await mockAsyncStorage.getItem(BLOCK_TYPES.METADATA);
      expect(metadata).toEqual(
        '{"cards":{"currentNum":2,"keyMap":{"0":"cards-1","1":"cards-1","2":"cards-1","3":"cards-1","4":"cards-1","5":"cards-1","6":"cards-1","7":"cards-1","8":"cards-1","9":"cards-1","10":"cards-1","11":"cards-1","12":"cards-1","13":"cards-1","14":"cards-1","a":"cards-1","b":"cards-1","c":"cards-1","d":"cards-1","e":"cards-1","f":"cards-2"}}}'
      );
    });

    it('should create a many blocks when the current one is full and (nb items > limit by block)', async () => {
      // $FlowFixMe
      await mockAsyncStorage.clear();
      await fillBlock(BLOCK_TYPES.CARDS, 20);

      const newItems = _.range(20, 50).reduce(
        (acc, i) => ({
          ...acc,
          [i]: {id: i}
        }),
        {}
      );

      await store(BLOCK_TYPES.CARDS, newItems);

      // $FlowFixMe
      const cards3 = await mockAsyncStorage.getItem('cards-3');

      expect(cards3).toEqual(
        '{"40":{"id":40},"41":{"id":41},"42":{"id":42},"43":{"id":43},"44":{"id":44},"45":{"id":45},"46":{"id":46},"47":{"id":47},"48":{"id":48},"49":{"id":49}}'
      );

      // $FlowFixMe
      const metadata = await mockAsyncStorage.getItem(BLOCK_TYPES.METADATA);
      expect(metadata).toEqual(
        '{"cards":{"currentNum":3,"keyMap":{"0":"cards-1","1":"cards-1","2":"cards-1","3":"cards-1","4":"cards-1","5":"cards-1","6":"cards-1","7":"cards-1","8":"cards-1","9":"cards-1","10":"cards-1","11":"cards-1","12":"cards-1","13":"cards-1","14":"cards-1","15":"cards-1","16":"cards-1","17":"cards-1","18":"cards-1","19":"cards-1","20":"cards-2","21":"cards-2","22":"cards-2","23":"cards-2","24":"cards-2","25":"cards-2","26":"cards-2","27":"cards-2","28":"cards-2","29":"cards-2","30":"cards-2","31":"cards-2","32":"cards-2","33":"cards-2","34":"cards-2","35":"cards-2","36":"cards-2","37":"cards-2","38":"cards-2","39":"cards-2","40":"cards-3","41":"cards-3","42":"cards-3","43":"cards-3","44":"cards-3","45":"cards-3","46":"cards-3","47":"cards-3","48":"cards-3","49":"cards-3"}}}'
      );
    });
  });

  describe('getItem', () => {
    it('should get an item from a block type with its key)', async () => {
      // $FlowFixMe
      await mockAsyncStorage.clear();
      await fillBlock(BLOCK_TYPES.CARDS, 20);
      const item = await getItem(BLOCK_TYPES.CARDS, '4');
      expect(item).toEqual({id: 4});
    });
  });
});
