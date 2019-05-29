// @flow strict

import type {Action} from '../actions/catalog';
import type {Action as BrandAction} from '../actions/brands';
import {FETCH_SUCCESS as BRAND_FETCH_SUCCESS} from '../actions/brands';
import {FETCH_SUCCESS as CARD_FETCH_SUCCESS, REFRESH_CARD} from '../actions/catalog';
import type {DisciplineCard, ChapterCard} from '../../layer/data/_types';
import type {SupportedLanguage} from '../../translations/_types';
import type {DashboardSection} from '../../types';

export type State = {|
  entities: {
    cards: {
      [key: string]: {
        [key: SupportedLanguage]: DisciplineCard | ChapterCard
      }
    },
    sections: {
      [key: string]: {
        ...DashboardSection,
        cardRefs: Array<string>
      }
    }
  }
|};

export const initialState: State = {
  entities: {
    cards: {},
    sections: {}
  }
};

export const reduceCards = (
  items: Array<DisciplineCard | ChapterCard>,
  language: SupportedLanguage
): {
  [key: string]: DisciplineCard | ChapterCard
} =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item.universalRef]: {
        ...result[item.universalRef],
        [language]: item
      }
    }),
    {}
  );

export const reduceSections = (sections: {
  [string]: DashboardSection
}): {
  [key: string]: {
    ...DashboardSection,
    cardRefs: Array<string>
  }
} =>
  Object.keys(sections).reduce((res, k) => {
    return {
      ...res,
      [k]: {
        ...sections[k],
        cardRefs: []
      }
    };
  }, {});

const reducer = (state: State = initialState, action: Action | BrandAction): State => {
  switch (action.type) {
    case BRAND_FETCH_SUCCESS: {
      const {item} = action.payload;
      const {dashboardSections} = item;

      return {
        ...state,
        entities: {
          ...state.entities,
          sections: {
            ...reduceSections(dashboardSections)
          }
        }
      };
    }

    case CARD_FETCH_SUCCESS: {
      const {items, language} = action.payload;

      return {
        ...state,
        entities: {
          ...state.entities,
          cards: {
            ...reduceCards(items, language)
          }
        }
      };
    }

    case REFRESH_CARD: {
      const {language, item} = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          cards: {
            [item.universalRef]: {
              ...(state.entities[item.universalRef] || {}),
              [language]: item
            }
          }
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;
