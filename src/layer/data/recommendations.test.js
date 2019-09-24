// @flow strict

import {createChapterCard} from '../../__fixtures__/cards';

jest.mock('./chapters', () => {
  const {mapToChapterAPIExpectedResult} = require('./mappers.test');

  return {
    find: () => Promise.resolve([mapToChapterAPIExpectedResult])
  };
});

jest.mock('../../utils/local-token', () => {
  const {createToken} = require('../../__fixtures__/tokens');
  const token = createToken({});
  return {
    get: jest.fn(() => Promise.resolve(token))
  };
});

jest.mock('cross-fetch');

describe('Recommendation data layer', () => {
  describe('find', () => {
    const {find} = require('./recommendations');

    it('should return recommendations', async () => {
      const result = await find('type', 'ref');
      const recommendation = {
        image:
          '//static.coorpacademy.com/content/CoorpAcademy/content-partnerships-fabernovel/cockpit-fabernovel/default/dataculture1a4-1542378128060.jpg',
        progress: 1,
        ref: 'cha_1',
        time: '8m',
        title: 'Fake chapter',
        type: 'chapter',
        view: 'grid'
      };
      const expected = [recommendation];

      expect(result).toEqual(expected);
    });
  });

  describe('fetch', () => {
    it('should fetch a recommendation', async () => {
      const fetch = require('cross-fetch');
      const mockRecommendation = createChapterCard({
        ref: 'foo',
        status: 'isStarted',
        title: 'plop',
        completion: 0
      });

      fetch.mockImplementationOnce(
        (
          url
        ): Promise<{
          json: () => Promise<DisciplineCard | ChapterCard | void>
        }> => {
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

      fetch.mockImplementationOnce(
        (
          url
        ): Promise<{
          json: () => Promise<DisciplineCard | ChapterCard | void>
        }> => {
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
      const localToken = require('../../utils/local-token');
      // $FlowFixMe this function is mocked;
      localToken.get.mockImplementationOnce(() => Promise.resolve(null));

      const {fetchRecommendation} = require('./recommendations');
      const fetching = fetchRecommendation();

      await expect(fetching).rejects.toThrow(new Error('Invalid token'));
    });
  });
});
