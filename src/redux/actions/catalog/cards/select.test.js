// @flow strict

import {fakeError} from '../../../../utils/tests';
import {createSections} from '../../../../__fixtures__/sections';
import {createBrand} from '../../../../__fixtures__/brands';
import {
  createDisciplineCard,
  createChapterCard,
  createCardLevel
} from '../../../../__fixtures__/cards';
import {CARD_STATUS} from '../../../../layer/data/_const';
import {selectRequest, selectSuccess, selectError, selectCards} from './select';

const brand = createBrand();
const language = 'en';

const level = createCardLevel({ref: 'mod_1', status: CARD_STATUS.ACTIVE, label: 'Fake level'});
const disciplineCard = createDisciplineCard({
  ref: 'dis1',
  completion: 0,
  levels: [level],
  title: 'Discipline'
});
const chapterCard = createChapterCard({
  ref: 'cha1',
  completion: 0,
  status: CARD_STATUS.ACTIVE,
  title: 'Chapter'
});
const items = [disciplineCard, chapterCard];

const section = createSections()[0];

describe('Cards', () => {
  describe('selectCard', () => {
    // @todo
  });
});
