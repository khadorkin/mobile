// @flow

import AsyncStorage from '@react-native-community/async-storage';
import {find} from './recommendations';

describe('Recommendation data layer', () => {
  describe('find', () => {
    it('should be mocked', async () => {
      AsyncStorage.getAllKeys = jest.fn().mockImplementation(key => {
        return Promise.resolve([]);
      });
      const actual = await find('type', 'ref');
      expect(actual).toEqual([]);
    });
  });
});
