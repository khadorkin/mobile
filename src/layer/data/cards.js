// @flow strict

import fetch from 'cross-fetch';
import {__E2E__} from '../../modules/environment';
import {createDisciplinesCards} from '../../__fixtures__/cards';
import disciplinesBundle from '../../__fixtures__/discipline-bundle';
import type {SupportedLanguage} from '../../translations/_types';
import type {Cards} from './_types';

const fetchFavoriteCards = async (
  language: SupportedLanguage,
  host: string,
  token: string
): Promise<Cards> => {
  const response = await fetch(
    `${host}/api/v2/contents?contentType=course&limit=5&playlist=favorites&lang=${language}`,
    {
      headers: {authorization: token}
    }
  );
  const result: {hits?: Cards} = await response.json();
  return result.hits || [];
};
const fetchRecommendationCards = async (
  language: SupportedLanguage,
  host: string,
  token: string
): Promise<Cards> => {
  const response = await fetch(
    `${host}/api/v2/recommendations?contentType=course&limit=5&lang=${language}`,
    {
      headers: {authorization: token}
    }
  );
  const result: {hits?: Cards} = await response.json();

  return result.hits || [];
};

const LIMIT_CARDS = 5;

export const fetchCards = async (
  language: SupportedLanguage,
  host: string,
  token: string
): Promise<Cards> => {
  if (__E2E__) {
    const disciplines = Object.keys(disciplinesBundle.disciplines).map(
      key => disciplinesBundle.disciplines[key]
    );
    const cards = createDisciplinesCards(disciplines);

    return cards;
  }
  const [favorites, recommendations] = await Promise.all([
    fetchFavoriteCards(language, host, token),
    fetchRecommendationCards(language, host, token)
  ]);

  return [...favorites, ...recommendations].slice(0, LIMIT_CARDS);
};

export default {
  fetchCards
};