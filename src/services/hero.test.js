// @flow strict

<<<<<<< HEAD
import {createDisciplineCard, createCardLevel} from '../__fixtures__/cards';
import {CARD_STATUS} from '../layer/data/_const';

const level = createCardLevel({
  ref: 'mod_1',
  status: CARD_STATUS.ACTIVE,
  label: 'Fake level'
});
const card = createDisciplineCard({
  ref: 'dis1',
  completion: 0,
  levels: [level],
  title: 'Discipline'
});

describe('Hero service', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('shoud return card in e2e', async () => {
    jest.mock('../modules/environment', () => ({
      __E2E__: true
    }));
    // $FlowFixMe
    const dataLayer: DataLayer = {
      fetchCards: jest.fn(() => Promise.resolve({cards: [card]}))
    };
    const createService = require('./hero').default;
    const service = createService(dataLayer);

    const result = await service.get();
    const expected = card;

    expect(dataLayer.fetchCards).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it('shoud not return card in other environments', async () => {
    jest.mock('../modules/environment', () => ({
      __E2E__: false
    }));
    // $FlowFixMe
    const dataLayer: DataLayer = {
      fetchCards: jest.fn(() => Promise.resolve({cards: [card]}))
    };
    const createService = require('./hero').default;
    const service = createService(dataLayer);

    const result = await service.get();

    expect(dataLayer.fetchCards).toHaveBeenCalledTimes(0);
    expect(result).toBeUndefined;
  });

  afterAll(() => {
    jest.resetAllMocks();
=======
import type {DataLayer} from '../layer/data';
import createService from './hero';

const card = 'foo';

jest.mock('../layer/data/progressions', () => {
  return {
    getAggregationsByContent: jest.fn(() => Promise.resolve(['a', 'b', 'c']))
  };
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

describe('Hero service', () => {
  it('get card', async () => {
    const heroService = createService({fetchCard, fetchRecommendation, getHeroContent});
    const result = await heroService.get();
    return expect(result).toEqual(card);
>>>>>>> coverage service.hero
  });
});
