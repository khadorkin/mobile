import {isExternalContent} from '../../../../utils';
import type {Card} from '../../../../layer/data/_types';
import translations from '../../../../translations';
import type {SupportedLanguage} from '../../../../translations/_types';
import type {StoreAction} from '../../../_types';
import {CONTENT_TYPE} from '../../../../const';

export const REFRESH = '@@cards/REFRESH';

export type Action = {
  type: '@@cards/REFRESH';
  payload: {
    language: SupportedLanguage;
    item: Card;
  };
};

export const refreshCard = (language: SupportedLanguage, item: Card): Action => ({
  type: REFRESH,
  payload: {
    language,
    item,
  },
});

export const updateCard = (language: SupportedLanguage, card: Card): StoreAction<Action> => {
  return async (dispatch, getState, options) => {
    const {services} = options;
    const refreshedCard = await services.Cards.refreshCard(card);
    return dispatch(refreshCard(language, refreshedCard));
  };
};

export const getAndRefreshCard = (progressionId: string): StoreAction<Action> => async (
  dispatch,
  getState,
  options,
) => {
  const {services} = options;

  const progression = await services.Progressions.findById(progressionId);
  if (
    progression &&
    (progression.content.type === CONTENT_TYPE.CHAPTER ||
      isExternalContent({type: progression.content.type} as Card) ||
      progression.content.type === CONTENT_TYPE.LEVEL)
  ) {
    const card = await services.Cards.getCardFromLocalStorage(progression.content.ref);
    if (card) {
      const language = translations.getLanguage();
      return dispatch(updateCard(language, card));
    }
  }
};
