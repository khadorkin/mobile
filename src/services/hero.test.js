// @flow strict

import {createChapterCard} from '../__fixtures__/cards';
import type {DataLayer} from '../layer/data';

jest.mock('../layer/data/progressions', () => {
  return {
    getAggregationsByContent: jest.fn(() => Promise.resolve(['a', 'b', 'c']))
  };
});

describe('Hero service', () => {
  const createService = require('./hero').default;

  it('should get card', async () => {
    const card = createChapterCard({
      ref: 'foo',
      status: 'isStarted',
      title: 'plop',
      completion: 12
    });

    const fetchCard = jest.fn();
    const fetchRecommendation = jest.fn();

    const getHeroContent = jest.fn();
    getHeroContent.mockImplementationOnce(
      ((_aggregations, _fetchRecommendation, _fetchCard) => {
        expect(_aggregations).toEqual(['a', 'b', 'c']);
        expect(_fetchRecommendation).toEqual(fetchRecommendation);
        expect(_fetchCard).toEqual(_fetchCard);
        return Promise.resolve(card);
      }: $PropertyType<DataLayer, 'getHeroContent'>)
    );

    // $FlowFixMe datalayer doesn't need to be filled with mocks for this test
    const heroService = createService({fetchCard, fetchRecommendation, getHeroContent});
    const result = await heroService.get();
    return expect(result).toEqual(card);
  });
});
