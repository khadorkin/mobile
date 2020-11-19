import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import pRetry from 'p-retry';
import {persist} from '../../layer/data/progressions';
import {getBrand, getToken} from '../utils/state-extract';
import {getAndRefreshCard} from '../actions/catalog/cards/refresh';
import {ExternalContentType} from '../../layer/data/_types';

export type ExternalTypeState = 'idle' | 'podcast' | 'article' | 'video' | 'scorm';
export type State = {
  contentStatus: 'idle' | 'started' | 'finished';
  contentUrl: string;
  webViewStatus: 'idle' | 'loading' | 'loaded';
  progressionId: string;
  validateButtonStatus: 'visible' | 'hidden';
  contentType: ExternalTypeState;
};

export const initialState: State = {
  contentStatus: 'idle',
  contentUrl: '',
  webViewStatus: 'idle',
  progressionId: '',
  validateButtonStatus: 'visible',
  contentType: 'idle',
};

export const ACTION_NAME = '@@external-content/update';

export type Action = {
  type: typeof ACTION_NAME;
  payload: Partial<State>;
};

const externalContentSlice = createSlice({
  name: '@@external-content',
  initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<State>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {update} = externalContentSlice.actions;
export const getContentInfo = (contentRef: string, contentType: ExternalContentType) => async (
  dispatch,
  getState,
  options,
) => {
  const state = getState();
  const token = getToken(state) as string;
  const brand = getBrand(state) as {host: string};

  const {services} = options;

  try {
    await dispatch(update({...initialState, contentType}));
    const [contentInfo, hideCompleteButton] = await Promise.all([
      services.Users.getExternalContentLoginInfo(brand.host, token, contentRef),
      services.Cards.getExternalContentHideCompleteButton(brand.host, token, contentRef),
    ]);

    return dispatch(
      update({
        validateButtonStatus: hideCompleteButton ? 'hidden' : 'visible',
        contentUrl: contentInfo.loginUrl,
      }),
    );
  } catch (error) {
    //
  }
};

export const completeProgressionAndPersist = (
  progressionId: string,
  callback: () => void,
  retries = 3,
) => async (dispatch, getState, options) => {
  const state = getState();
  const brand = getBrand(state) as {host: string};
  const token = getToken(state) as string;

  const {services} = options;

  try {
    const progression = await pRetry(
      () => services.Progressions.completeRemoteProgression(brand.host, token, progressionId),
      {retries},
    );
    if (progression?._id) {
      await persist(progression);
      await dispatch(getAndRefreshCard(progressionId));
    }
    return callback();
  } catch (error) {
    return callback();
  }
};

export const getRemoteCurrentProgressionId = (extContRef: string, retries = 15) => async (
  dispatch,
  getState,
  options,
) => {
  const state = getState();
  const brand = getBrand(state) as {host: string};
  const token = getToken(state) as string;

  const {services} = options;

  try {
    const currentProgressionId = await pRetry(
      () =>
        services.Progressions.getRemoteCurrentProgressionId(
          brand.host,
          token,
          extContRef,
          state.externalContent.contentType,
        ),
      {retries},
    );
    return dispatch(update({progressionId: currentProgressionId}));
  } catch (error) {
    //
  }
};

export default externalContentSlice.reducer;
