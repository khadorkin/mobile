// @flow strict
import type {ExitNodeAPI} from '@coorpacademy/player-services';

import translations from '../../translations';
import {mapToExitNodeAPI} from './mappers';
import {getItem} from './core';
import {CONTENT_TYPE} from './_const';
import type {ExitNode} from './_types';

export const getExitNode = async (exitNodeRef: string): Promise<ExitNodeAPI> => {
  const language = translations.getLanguage();

  return new Promise(function(resolve, reject) {
    getItem(CONTENT_TYPE.EXIT_NODE, language, exitNodeRef, (error, item) => {
      resolve(mapToExitNodeAPI(item));
    });
  });
};

export default getExitNode;
