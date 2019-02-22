// @flow

import {Answers, Clues, Content, Progressions} from '@coorpacademy/player-services';

import type {
  AnalyticsService,
  AnswersService,
  CluesService,
  ContentService,
  ProgressionsService
} from '@coorpacademy/player-services';

import type {DataLayer} from '../layer/data';
import type {DisciplineBundleService} from './discipline-bundle';
import DisciplineBundle from './discipline-bundle';
import Analytics from './analytics';

export type Services = {|
  Analytics: AnalyticsService,
  Answers: AnswersService,
  Clues: CluesService,
  Content: ContentService,
  DisciplineBundle: DisciplineBundleService,
  Progressions: ProgressionsService
|};

const createServices = (dataLayer: DataLayer): Services => ({
  Analytics,
  Answers: Answers(dataLayer),
  Clues: Clues(dataLayer),
  Content: Content(dataLayer),
  DisciplineBundle: DisciplineBundle(dataLayer),
  Progressions: Progressions(dataLayer)
});

export default createServices;
