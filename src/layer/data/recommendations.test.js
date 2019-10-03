// @flow strict

import {createChapterCard} from '../../__fixtures__/cards';
import type {DisciplineCard, ChapterCard} from './_types';

jest.mock('../../utils/local-token', () => ({
  get: jest.fn()
}));

jest.mock('cross-fetch');

describe('Recommendation data layer', () => {
  describe('fetchRecommendation', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it('should fetch a recommendation', async () => {
      const fetch = require('cross-fetch');
      const {get} = require('../../utils/local-token');
      const {createToken} = require('../../__fixtures__/tokens');
      const token = createToken({});

      // $FlowFixMe mocking
      get.mockImplementationOnce(() => Promise.resolve(token));

      const mockRecommendation = createChapterCard({
        ref: 'foo',
        status: 'isStarted',
        title: 'plop',
        completion: 0
      });

      fetch.mockImplementationOnce(
        (
          url,
          params
        ): Promise<{
          json: () => Promise<{hits: Array<DisciplineCard | ChapterCard | void>}>
        }> => {
          expect(params.headers.authorization).toEqual(token);
          expect(url).toBe('https://domain.tld/api/v2/recommendations');

          return Promise.resolve({
            json: () => Promise.resolve({hits: [mockRecommendation]})
          });
        }
      );

      const {fetchRecommendation} = require('./recommendations');
      const recommendation = await fetchRecommendation();
      return expect(recommendation).toEqual(mockRecommendation);
    });

    it('should return undefined if no recommendation is found', async () => {
      const fetch = require('cross-fetch');
      const {get} = require('../../utils/local-token');
      const {createToken} = require('../../__fixtures__/tokens');
      const token = createToken({});

      // $FlowFixMe mocking
      get.mockImplementationOnce(() => Promise.resolve(token));

      fetch.mockImplementationOnce(
        (
          url,
          params
        ): Promise<{
          json: () => Promise<{hits: Array<DisciplineCard | ChapterCard | void>}>
        }> => {
          expect(params.headers.authorization).toEqual(token);
          expect(url).toBe('https://domain.tld/api/v2/recommendations');

          return Promise.resolve({
            json: () => Promise.resolve({hits: []})
          });
        }
      );

      const {fetchRecommendation} = require('./recommendations');
      const recommendation = await fetchRecommendation();
      return expect(recommendation).toEqual(undefined);
    });

    it('should return throw error', async () => {
      const fetch = require('cross-fetch');
      const {get} = require('../../utils/local-token');

      // $FlowFixMe mocking
      get.mockImplementationOnce(() => Promise.resolve(null));

      const {fetchRecommendation} = require('./recommendations');
      const fetching = fetchRecommendation();

      await expect(fetching).rejects.toThrow(new Error('Invalid token'));
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    afterAll(() => {
      jest.resetAllMocks();
    });
  });
});
