// @flow

import type {ChapterAPI, RecommendationAPI} from '@coorpacademy/player-services';

import decode from 'jwt-decode';
import {get as getToken} from '../../utils/local-token';
import type {DisciplineCard, ChapterCard} from './_types';
import {CONTENT_TYPE} from './_const';
import {find as findChapters} from './chapters';

const find = async (type: string, ref: string): Promise<Array<RecommendationAPI>> => {
  const chapters: Array<ChapterAPI> = await findChapters();

  // $FlowFixMe this type is totally fucked up
  const recommendations: Array<RecommendationAPI> = chapters.map(chapter => ({
    view: 'grid',
    image: chapter && chapter.poster && chapter.poster.mediaUrl,
    time: '8m',
    type: CONTENT_TYPE.CHAPTER,
    progress: 1,
    title: chapter.name,
    ref: chapter._id
  }));

  return Promise.resolve(recommendations);
};

const fetch = async (): Promise<DisciplineCard | ChapterCard | void> => {
  const token = getToken();
  const jwt: JWT = decode(token);
  const response = await fetch(`${jwt.host}/api/v2/recommendations`, {
    headers: {
      authorization: token
    }
  });

  const {hits}: {hits?: Array<DisciplineCard | ChapterCard>} = await response.json();
  return hits[0];
};

export {fetch, find};
