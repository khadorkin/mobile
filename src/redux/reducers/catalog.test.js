// @flow strict

import {createDisciplineCard} from '../../__fixtures__/cards';
import {FETCH_SUCCESS as BRAND_FETCH_SUCCESS} from '../actions/brands';
import {FETCH_SUCCESS as CARD_FETCH_SUCCESS, REFRESH_CARD} from '../actions/catalog';
import type {Action as BRAND_ACTION} from '../actions/brands';
import type {Action} from '../actions/catalog';
import reducer, {reduceCards} from './catalog';

import type {State} from './catalog';

const dis1 = createDisciplineCard({
  ref: 'dis1',
  completion: 0,
  levels: [],
  title: 'First discipline'
});
const dis2 = createDisciplineCard({
  ref: 'dis2',
  completion: 0,
  levels: [],
  title: 'Second discipline'
});

describe('Catalog', () => {
  const expectedInitialState: State = {
    entities: {
      cards: {},
      sections: {}
    }
  };

  it('Default', () => {
    const action = {
      type: 'FAKE_ACTION'
    };
    // $FlowFixMe we are trying to emulate something else
    const result = reducer(undefined, action);
    expect(result).toEqual(expectedInitialState);
  });

  const reduceCardsExpected = {
    dis1: {
      en: dis1
    },
    dis2: {
      en: dis2
    }
  };

  it('reduceCards', () => {
    const result = reduceCards([dis1, dis2], 'en');
    expect(result).toEqual(reduceCardsExpected);
  });

  describe(BRAND_FETCH_SUCCESS, () => {
    it('Default', () => {
      const action: BRAND_ACTION = {
        type: BRAND_FETCH_SUCCESS,
        payload: {
          item: {
            name: 'foo',
            host: 'http://foo',
            contentCategoryName: 'plop',
            colors: {
              primary: '#f0f'
            },
            images: {
              'logo-mobile': 'plop'
            },
            dashboardSections: {
              sec1: {
                type: 'theme',
                display: true,
                order: 1,
                contentType: 'all'
              }
            }
          }
        }
      };
      const result = reducer(undefined, action);
      const expected: State = {
        entities: {
          cards: {},
          sections: {
            sec1: {
              cardRefs: [],
              type: 'theme',
              display: true,
              order: 1,
              contentType: 'all'
            }
          }
        }
      };
      expect(result).toEqual(expected);
    });
  });

  describe(CARD_FETCH_SUCCESS, () => {
    it('Default', () => {
      const action: Action = {
        type: CARD_FETCH_SUCCESS,
        payload: {
          items: [dis1, dis2],
          language: 'en'
        }
      };
      const result = reducer(undefined, action);
      const expected: State = {
        entities: {
          cards: reduceCardsExpected,
          sections: {}
        }
      };
      expect(result).toEqual(expected);
    });
  });

  describe(REFRESH_CARD, () => {
    it('Default', () => {
      const language = 'en';
      const initialState = {
        entities: {
          cards: {
            [dis1.universalRef]: {
              [language]: dis1,
              fr: dis1
            },
            [dis2.universalRef]: {
              [language]: dis2,
              fr: dis2
            }
          },
          sections: {}
        }
      };

      const dis3 = {
        ...dis2,
        universalRef: dis1.universalRef
      };

      const action: Action = {
        type: REFRESH_CARD,
        payload: {
          item: dis3,
          language: language
        }
      };
      const result = reducer(initialState, action);
      const expected: State = {
        entities: {
          ...initialState.entities,
          cards: {
            [dis1.universalRef]: {
              ...initialState.entities[dis1.universalRef],
              [language]: dis3
            }
          },
          sections: {}
        }
      };
      expect(result).toEqual(expected);
    });
    it('if state is empty', () => {
      const language = 'en';
      const intialState = {
        entities: {
          cards: {},
          sections: {}
        }
      };

      const dis3 = {
        ...dis2,
        universalRef: dis1.universalRef
      };

      const action: Action = {
        type: REFRESH_CARD,
        payload: {
          item: dis3,
          language: language
        }
      };
      const result = reducer(intialState, action);
      const expected: State = {
        entities: {
          ...intialState.entities,
          cards: {
            [dis1.universalRef]: {
              ...intialState.entities[dis1.universalRef],
              [language]: dis3
            }
          },
          sections: {}
        }
      };
      expect(result).toEqual(expected);
    });
  });
});
