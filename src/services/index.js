// @flow

import {Answers, Clues, Content, LeaderBoard} from '@coorpacademy/player-services';

import type {
  AnalyticsService,
  AnswersService,
  CluesService,
  ContentService
} from '@coorpacademy/player-services';

import type {DataLayer} from '../layer/data';
import type {DisciplineBundleService} from './discipline-bundle';
import DisciplineBundle from './discipline-bundle';
import type {CardsService} from './cards';
import Cards from './cards';
import type {BrandsService} from './brands';
import Brands from './brands';
import Analytics from './analytics';
import Permissions from './permissions';
import type {PermissionsService} from './permissions';
import Progressions from './progressions';
import Recommendations from './recommendations';
import type {ProgressionService} from './progressions';

export type Services = {|
  Analytics: AnalyticsService,
  Answers: AnswersService,
  Cards: CardsService,
  Clues: CluesService,
  Content: ContentService,
  DisciplineBundle: DisciplineBundleService,
  Progressions: ProgressionService,
  Brands: BrandsService,
  Permissions: PermissionsService,
  LeaderBoard: typeof LeaderBoard,
  Recommendations: typeof Recommendations
|};

const createServices = (dataLayer: DataLayer): Services => ({
  Analytics,
  // $FlowFixMe
  Answers: Answers(dataLayer),
  Cards: Cards(dataLayer),
  // $FlowFixMe
  Clues: Clues(dataLayer),
  // $FlowFixMe
  Content: Content(dataLayer),
  DisciplineBundle: DisciplineBundle(dataLayer),
  Progressions: Progressions(dataLayer),
  Brands: Brands(dataLayer),
  Recommendations: Recommendations(dataLayer),
  Permissions,
  LeaderBoard
});

export default createServices;
