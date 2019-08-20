// @flow

import {
  validateAnswer as _validateAnswer,
  getQuestionType,
  getPreviousSlide
} from '@coorpacademy/player-store';

import {checkIsCorrect} from '../../utils/state-extract';
import {ANALYTICS_EVENT_TYPE} from '../../../const';
import {time} from '../../../modules/time';

export const validateAnswer: typeof _validateAnswer = () => async (dispatch, getState, options) => {
  const {services} = options;

  console.log('validate answer | _validateAnswer | 1/7', time());
  // $FlowFixMe
  const {godmode, fastSlide} = getState();
  // $FlowFixMe
  const result = await _validateAnswer({
    godMode: godmode,
    fastSlide: fastSlide
  })(dispatch, getState, options);
  console.log('validate answer | getPreviousSlide | 2/7', time());

  const state: StoreState = getState();

  console.log('validate answer | getPreviousSlide | 3/7', time());
  const previousSlide = getPreviousSlide(state);
  console.log('validate answer | getQuestionType | 4/7', time());
  const questionType = previousSlide && getQuestionType(previousSlide);
  console.log('validate answer | checkIsCorrect | 5/7', time());
  const isCorrect = checkIsCorrect(state);

  console.log('validate answer | logEvent | 6/7', time());
  services.Analytics.logEvent(ANALYTICS_EVENT_TYPE.VALIDATE_ANSWER, {
    questionType,
    isCorrect: Number(isCorrect)
  });

  console.log('validate answer | done | 7/7', time());
  return dispatch(result);
};

export default {
  validateAnswer
};
