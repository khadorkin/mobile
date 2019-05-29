// @flow strict

import type {DisciplineCard, ChapterCard} from '../../layer/data/_types';
import type {SupportedLanguage} from '../../translations/_types';
import type {StoreAction, ErrorAction} from '../_types';
import {ENGINE, ERROR_TYPE, CONTENT_TYPE} from '../../const';
import {getToken, getBrand} from '../utils/state-extract';
import {pickNextLevel} from '../../utils/content';
import {CARD_TYPE, RESTRICTED_RESOURCE_TYPE} from '../../layer/data/_const';
import type {DashboardSection} from '../../types';
import {showModal} from './ui/modal';
import {createLevelProgression, createChapterProgression, selectProgression} from './progression';
// import type {Action as BrandAction} from './brands';
import type {Action as BundleAction} from './bundle';
import type {Action as ModalAction} from './ui/modal';

export const FETCH_REQUEST = '@@cards/FETCH_REQUEST';
export const FETCH_SUCCESS = '@@cards/FETCH_SUCCESS';
export const FETCH_ERROR = '@@cards/FETCH_ERROR';
export const SELECT_CARD = '@@cards/SELECT_CARD';
export const SELECT_CARD_FAILURE = '@@cards/SELECT_CARD_FAILURE';
export const REFRESH_CARD = '@@cards/REFRESH_CARD';

export type Action =
  | {|
      type: '@@cards/FETCH_REQUEST',
      payload: {
        language: SupportedLanguage
      }
    |}
  | {|
      type: '@@cards/FETCH_SUCCESS',
      payload: {
        items: Array<DisciplineCard | ChapterCard>,
        language: SupportedLanguage
      }
    |}
  | ErrorAction<{|
      type: '@@cards/FETCH_ERROR'
    |}>
  | {|
      type: '@@cards/SELECT_CARD',
      payload: {
        item: DisciplineCard | ChapterCard
      }
    |}
  | ErrorAction<{|
      type: '@@cards/SELECT_CARD_FAILURE'
    |}>
  | {|
      type: '@@cards/REFRESH_CARD',
      payload: {
        item: DisciplineCard | ChapterCard,
        language: SupportedLanguage
      }
    |};

export const fetchRequest = (language: SupportedLanguage): Action => ({
  type: FETCH_REQUEST,
  payload: {
    language
  }
});

export const fetchSuccess = (
  items: Array<DisciplineCard | ChapterCard>,
  language: SupportedLanguage
): Action => ({
  type: FETCH_SUCCESS,
  payload: {
    items,
    language
  }
});

export const fetchError = (error: Error): Action => ({
  type: FETCH_ERROR,
  payload: error,
  error: true
});

export const refreshCard = (
  language: SupportedLanguage,
  card: DisciplineCard | ChapterCard
): Action => ({
  type: REFRESH_CARD,
  payload: {
    language,
    item: card
  }
});

export const fetchCards = (
  visibleSections: Array<DashboardSection>,
  language: SupportedLanguage
): StoreAction<Action | BundleAction | ModalAction<StoreAction<Action | BundleAction>>> => {
  return async (dispatch, getState, options) => {
    await dispatch(fetchRequest(language));

    const state = getState();
    const token = getToken(state);
    const brand = getBrand(state);

    const {services} = options;

    try {
      if (token === null) throw new TypeError('Token not defined');
      if (brand === null) throw new TypeError('Brand not defined');

      const cards = await services.Cards.find(token, brand.host, language);

      if (cards.length === 0) {
        return dispatch(
          showModal({
            errorType: ERROR_TYPE.NO_CONTENT_FOUND,
            lastAction: () => fetchCards(visibleSections, language)
          })
        );
      }

      return dispatch(fetchSuccess(cards, language));
    } catch (err) {
      return dispatch(fetchError(err));
    }
  };
};

export const selectCardFailure = (item?: DisciplineCard | ChapterCard, error: Error): Action => ({
  type: SELECT_CARD_FAILURE,
  payload: error,
  error: true
});

export const selectCard = (item: DisciplineCard | ChapterCard): StoreAction<Action> => {
  return async (dispatch, getState, options) => {
    const {services} = options;
    switch (item.type) {
      case CARD_TYPE.CHAPTER: {
        try {
          // Resume progression
          const lastProgression = await services.Progressions.findLast(
            ENGINE.MICROLEARNING,
            item.universalRef
          );
          if (lastProgression) {
            // $FlowFixMe union type
            return dispatch(selectProgression(lastProgression._id));
          }

          const chapter = await services.Content.find(
            // $FlowFixMe union type
            RESTRICTED_RESOURCE_TYPE.CHAPTER,
            item.universalRef
          );

          // $FlowFixMe union type
          const {payload: progression} = await dispatch(createChapterProgression(chapter));
          // $FlowFixMe union type
          return dispatch(selectProgression(progression._id));
        } catch (e) {
          return dispatch(selectCardFailure(item, new Error('Chapter progression not created')));
        }
      }
      case CARD_TYPE.COURSE: {
        const nextModule = pickNextLevel(item);
        if (!nextModule) {
          return dispatch(selectCardFailure(item, new Error('Course has no level')));
        }
        try {
          // Resume progression
          const lastProgression = await services.Progressions.findLast(
            ENGINE.LEARNER,
            nextModule.universalRef
          );
          if (lastProgression) {
            // $FlowFixMe union type
            return dispatch(selectProgression(lastProgression._id));
          }

          // $FlowFixMe union type
          const level = await services.Content.find(
            RESTRICTED_RESOURCE_TYPE.LEVEL,
            nextModule.universalRef
          );

          // $FlowFixMe union type
          const {payload: progression} = await dispatch(createLevelProgression(level));
          // $FlowFixMe union type
          return dispatch(selectProgression(progression._id));
        } catch (e) {
          return dispatch(selectCardFailure(item, new Error('Level progression not created')));
        }
      }
    }
  };
};

export const updateCard = (
  language: SupportedLanguage,
  card: DisciplineCard | ChapterCard
): StoreAction<Action> => {
  return async (dispatch, getState, options) => {
    const {services} = options;
    const refreshedCard = await services.Cards.refreshCard(card);
    return dispatch(refreshCard(language, refreshedCard));
  };
};

export const getAndRefreshCard = (
  progressionId: string,
  language: SupportedLanguage
): StoreAction<Action> => async (dispatch, getState, options) => {
  const {services} = options;

  const progression = await services.Progressions.findById(progressionId);
  if (
    progression &&
    (progression.content.type === CONTENT_TYPE.CHAPTER ||
      progression.content.type === CONTENT_TYPE.LEVEL)
  ) {
    const card = await services.Cards.getCardFromLocalStorage(progression.content.ref, language);
    if (card) {
      return dispatch(updateCard(language, card));
    }
  }
};
