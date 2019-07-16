// @flow strict

import {fakeError} from '../../utils/tests';
import {find} from './disciplines';

jest.mock('./core', () => {
  const utils = require('../../utils/tests');

  return {
    getItem: (type, language, ref) => {
      if (ref === 'void_ref') {
        return Promise.resolve(undefined);
      }
      if (type === 'ref_exception') {
        return Promise.reject(utils.fakeError);
      }

      return Promise.resolve({foo: 'bar'});
    }
  };
});

describe('disciplines', () => {
  describe('find', () => {
    it('should find discipline', async () => {
      // $FlowFixMe this is only to test
      const result = await find('en')('ref_discipline');
      expect(result).toEqual({foo: 'bar'});
    });

    it('should handle exception', () => {
      // $FlowFixMe this is only to test
      const result = find('en')('ref_exception');
      expect(result).rejects.toThrow(fakeError);
    });

    it('should return undefined', async () => {
      // $FlowFixMe this is only to test
      const result = await find('en')('void_ref');
      expect(result).not.toBeDefined();
    });
  });
});
