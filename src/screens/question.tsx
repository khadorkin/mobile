import * as React from 'react';
import {StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
  editAnswer,
  getAnswerValues,
  getQuestionMedia,
  getQuestionType,
  getCurrentSlide,
  isQuestionCtaDisabled,
  getChoices,
} from '@coorpacademy/player-store';
import type {Media, QuestionType, Choice} from '@coorpacademy/progression-engine';

import {StackScreenProps} from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/native';
import Question from '../components/question';
import type {Props as QuestionProps} from '../components/question';
import Screen from '../components/screen';
import type {StoreState} from '../redux/store';
import {
  getQuestion,
  getContentCorrectionInfo,
  getValidationStatus,
} from '../redux/utils/state-extract';
import {changeAnswerValidationStatus, validateAnswer} from '../redux/actions/ui/answers';
import {HEADER_BACKGROUND_COLOR} from '../navigator/navigation-options';
import {QUESTION_TYPE} from '../const';
import type {Params as CorrectionParams} from './correction';
import type {Params as LevelEndParams} from './level-end';

export interface ConnectedStateProps {
  type?: QuestionType;
  header?: string;
  explanation?: string;
  template?: string;
  choices?: Array<Choice>;
  userChoices?: Array<string>;
  media?: Media;
  min?: Pick<QuestionProps, 'min'>;
  max?: Pick<QuestionProps, 'max'>;
  unit?: Pick<QuestionProps, 'unit'>;
  step?: Pick<QuestionProps, 'step'>;
  value?: Pick<QuestionProps, 'value'>;
  isValidationDisabled?: Pick<QuestionProps, 'isValidationDisabled'>;
  slideId?: string;
  isValidating?: boolean;
}

interface ConnectedDispatchProps {
  editAnswer: typeof editAnswer;
  validateAnswer: typeof validateAnswer;
  changeAnswerValidationStatus: typeof changeAnswerValidationStatus;
}

type Params = {
  Question: undefined;
  Context: undefined;
  Modals: {
    screen: 'LevelEnd' | 'Correction';
    params: LevelEndParams | CorrectionParams;
  };
};

interface Props
  extends StackScreenProps<Params, 'Question'>,
    ConnectedStateProps,
    ConnectedDispatchProps {}

const QuestionScreen: React.FC<Props> = ({
  changeAnswerValidationStatus: changeAnswerValidationStatus_,
  ...props
}) => {
  const scrollViewRef = React.useRef<KeyboardAwareScrollView>(null);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    changeAnswerValidationStatus_(false);
  }, [changeAnswerValidationStatus_, props.slideId]);

  React.useEffect(() => {
    if (scrollViewRef.current && props.slideId) {
      scrollViewRef.current.props.scrollToPosition(0, 0, true);
    }
  }, [props.slideId]);

  const {
    choices = [],
    type,
    header,
    explanation,
    media,
    min,
    max,
    unit,
    step,
    value,
    template,
    userChoices = [],
    isValidationDisabled,
    editAnswer: editAnswer_,
    validateAnswer: validateAnswer_,
    navigation: {navigate},
    slideId,
    isValidating,
  } = props;

  const handleChoicePress = React.useCallback((item: Choice) => editAnswer_(item), [editAnswer_]);

  const handleSliderChange = React.useCallback(
    (newValue: number) => editAnswer_(String(newValue)),
    [editAnswer_],
  );

  const handleInputValueChange = React.useCallback((value: string) => editAnswer_(value), [
    editAnswer_,
  ]);

  const handleChoiceInputChange = React.useCallback(
    (item: Choice, value: string) => {
      const values = choices.map((choice, index) => {
        const currentValue = userChoices[index] !== undefined ? userChoices[index] : '';

        return choice._id === item._id ? value : currentValue;
      });

      editAnswer_(values);
    },
    [choices, editAnswer_, userChoices],
  );

  const handleButtonPress = React.useCallback(async () => {
    const state = await validateAnswer_();

    const {
      isCorrect,
      isAdaptive,
      hasContext,
      isContentFinished,
      progressionId,
    } = getContentCorrectionInfo(state);

    if (isAdaptive) {
      if (!isContentFinished) {
        return navigate(hasContext ? 'Context' : 'Question');
      }
      const levelEndParams: LevelEndParams = {
        isCorrect,
        progressionId,
      };
      return navigate('Modals', {screen: 'LevelEnd', params: levelEndParams});
    }
    const correctionParams: CorrectionParams = {
      slideId,
    };
    return navigate('Modals', {screen: 'Correction', params: correctionParams});
  }, [navigate, slideId, validateAnswer_]);

  return (
    <Screen testID="question-screen" onRef={scrollViewRef}>
      <StatusBar barStyle="dark-content" backgroundColor={HEADER_BACKGROUND_COLOR} />
      <Question
        type={type}
        choices={choices}
        header={header}
        explanation={explanation}
        template={template}
        media={media}
        userChoices={userChoices}
        onChoicePress={handleChoicePress}
        onButtonPress={handleButtonPress}
        onSliderChange={handleSliderChange}
        onChoiceInputChange={handleChoiceInputChange}
        onInputValueChange={handleInputValueChange}
        min={min}
        max={max}
        unit={unit}
        step={step}
        value={value}
        isValidationDisabled={isValidationDisabled}
        testID="question"
        isLoading={isValidating || !isFocused}
      />
    </Screen>
  );
};

const getSlideIdState = createSelector([getCurrentSlide], (slide) => slide && slide._id);

const getQuestionTypeState = createSelector([getQuestion], (question) => question && question.type);

const getQuestionHeaderState = createSelector(
  [getQuestion],
  (question) => question && question.header,
);

const getQuestionExplanationState = createSelector(
  [getQuestion],
  (question) => question && question.explanation,
);

const getQuestionTemplateState = createSelector(
  [getQuestion],
  // @ts-ignore union type
  (question) => question && question.content.template,
);

const getChoices_ = getChoices();
const getQuestionChoicesState = (state: StoreState) =>
  createSelector(
    [getCurrentSlide],
    // @ts-ignore union type
    (slide) => slide && getChoices_(slide, state),
  )(state);

const getQuestionUserChoicesState = (state: StoreState) =>
  createSelector([getCurrentSlide], (slide) => slide && getAnswerValues(slide, state))(state);

const getQuestionMediaState = createSelector([getQuestionMedia], (media) => media);

const getSliderUnitState = createSelector(
  [getQuestion],
  // @ts-ignore union type
  (question) => question && question.content.unitLabel,
);

const getSliderMinState = createSelector(
  [getQuestion],
  // @ts-ignore union type
  (question) => question && question.content.min,
);

const getSliderMaxState = createSelector(
  [getQuestion],
  // @ts-ignore union type
  (question) => question && question.content.max,
);

const getSliderStepValueState = createSelector(
  [getQuestion],
  // @ts-ignore union type
  (question) => question && question.content.step,
);

const getSliderDefaultValueState = (state: StoreState) =>
  createSelector([getCurrentSlide], (slide) => {
    const type = slide && getQuestionType(slide);
    const values = slide && getAnswerValues(slide, state);

    return type === QUESTION_TYPE.SLIDER && values ? parseInt(values[0]) : 0;
  })(state);

const getIsValidationDisabled = createSelector([isQuestionCtaDisabled], (result) => result);

export const mapStateToProps = (state: StoreState): ConnectedStateProps => ({
  slideId: getSlideIdState(state),
  type: getQuestionTypeState(state),
  header: getQuestionHeaderState(state),
  explanation: getQuestionExplanationState(state),
  template: getQuestionTemplateState(state),
  choices: getQuestionChoicesState(state),
  userChoices: getQuestionUserChoicesState(state),
  media: getQuestionMediaState(state),
  min: getSliderMinState(state),
  max: getSliderMaxState(state),
  unit: getSliderUnitState(state),
  step: getSliderStepValueState(state),
  value: getSliderDefaultValueState(state),
  isValidationDisabled: getIsValidationDisabled(state),
  isValidating: getValidationStatus(state),
});

const mapDispatchToProps: ConnectedDispatchProps = {
  editAnswer,
  validateAnswer,
  changeAnswerValidationStatus,
};

export {QuestionScreen as Component};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(QuestionScreen));
