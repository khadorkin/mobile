import {ENGINE} from '../../const';
import {CONTENT_TYPE} from '../../types/coorpacademy/player-services';
import {createBrand} from '../../__fixtures__/brands';
import {createAuthenticationState} from '../../__fixtures__/store';
import {createProgression} from '../../__fixtures__/progression';
import type {State} from '.';
import reducer, {
  initialState,
  ACTION_NAME,
  getContentInfo,
  completeProgressionAndPersist,
  getRemoteCurrentProgressionId,
} from '.';

describe('ExternalContent', () => {
  describe('reducer', () => {
    it('returns the initial state if the given one is undefined', () => {
      let action = {
        type: ACTION_NAME,
      };
      const result = reducer(undefined, action);
      expect(result).toEqual(initialState);
    });
    it('updates the current state if given action matches', () => {
      const payload: State = {
        contentType: 'scorm',
        contentStatus: 'idle',
        contentUrl: 'https://scorm.net',
        webViewStatus: 'loading',
        progressionId: '',
        validateButtonStatus: 'visible',
      };
      let action = {
        type: ACTION_NAME,
        payload,
      };
      const result = reducer(initialState, action);
      expect(result).toEqual(payload);
    });
  });

  describe('thunks', () => {
    describe('getContentInfo', () => {
      it('throws an error if anything goes wrong', async () => {
        const brand = createBrand();
        const authentication = createAuthenticationState({brand});
        const dispatch = jest.fn();
        const options = {
          services: {
            Users: {
              getExternalContentLoginInfo: jest.fn(() =>
                Promise.reject(new Error('Could not get content info')),
              ),
            },
            Cards: {
              getExternalContentHideCompleteButton: jest.fn(() =>
                Promise.reject(new Error('Could not get content complete button info')),
              ),
            },
          },
        };
        const getState = jest.fn(() => ({authentication}));
        await getContentInfo('extCont_2Ers23', 'scorm')(dispatch, getState, options);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toBeCalledWith({
          payload: {
            contentType: 'scorm',
            contentStatus: 'idle',
            contentUrl: '',
            webViewStatus: 'idle',
            progressionId: '',
            validateButtonStatus: 'visible',
          },
          type: ACTION_NAME,
        });
      });

      it('gets a login token for given content and user', async () => {
        const brand = createBrand();
        const authentication = createAuthenticationState({brand});
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({authentication}));
        const options = {
          services: {
            Users: {
              getExternalContentLoginInfo: jest.fn(() =>
                Promise.resolve({
                  loginUrl: 'https://scorm.net/content/extCont_2Ers23',
                }),
              ),
            },
            Cards: {
              getExternalContentHideCompleteButton: jest
                .fn()
                .mockImplementationOnce(() => Promise.resolve(false))
                .mockImplementationOnce(() => Promise.resolve(true)),
            },
          },
        };
        await getContentInfo('extCont_2Ers23', 'scorm')(dispatch, getState, options);
        await getContentInfo('extCont_2Ers23', 'scorm')(dispatch, getState, options);
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).nthCalledWith(2, {
          payload: {
            contentUrl: 'https://scorm.net/content/extCont_2Ers23',
            validateButtonStatus: 'visible',
          },
          type: ACTION_NAME,
        });
        expect(dispatch).nthCalledWith(4, {
          payload: {
            contentUrl: 'https://scorm.net/content/extCont_2Ers23',
            validateButtonStatus: 'hidden',
          },
          type: ACTION_NAME,
        });
      });
    });

    describe('completeProgressionAndPersist', () => {
      it('runs the callback when an error has been thrown', async () => {
        const brand = createBrand();
        const authentication = createAuthenticationState({brand});
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({
          authentication,
          externalContent: {
            contentType: 'scorm',
            contentStatus: 'idle',
            contentUrl: 'https://scorm.net',
            webViewStatus: 'loading',
            progressionId: '',
            validateButtonStatus: 'visible',
          },
        }));
        const progressionId = '5435fE34decs024535';
        const options = {
          services: {
            Progressions: {
              completeRemoteProgression: jest.fn(() =>
                Promise.reject(new Error('something went wrong')),
              ),
            },
          },
        };
        const callback = jest.fn();
        await completeProgressionAndPersist(progressionId, callback, 1)(
          dispatch,
          getState,
          options,
        );
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(callback).toHaveBeenCalledTimes(1);
      });

      it('does not dispatch any action and runs the callback when an invalid progression has been returned from server', async () => {
        const brand = createBrand();
        const authentication = createAuthenticationState({brand});
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({
          authentication,
          externalContent: {
            contentType: 'scorm',
            contentStatus: 'idle',
            contentUrl: 'https://scorm.net',
            webViewStatus: 'loading',
            progressionId: '',
            validateButtonStatus: 'visible',
          },
        }));
        const progressionId = '5435fE34decs024535';
        const progression = createProgression({
          engine: ENGINE.EXTERNAL,
          progressionContent: {
            type: CONTENT_TYPE.LEVEL,
            ref: '',
          },
        });
        const options = {
          services: {
            Progressions: {
              completeRemoteProgression: jest.fn(() => Promise.resolve(progression)),
            },
          },
        };
        const callback = jest.fn();
        await completeProgressionAndPersist(progressionId, callback, 1)(
          dispatch,
          getState,
          options,
        );
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(callback).toHaveBeenCalledTimes(1);
      });

      it('successfully completes a progression', async () => {
        const brand = createBrand();
        const authentication = createAuthenticationState({brand});
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({
          authentication,
          externalContent: {
            contentType: 'scorm',
            contentStatus: 'idle',
            contentUrl: 'https://scorm.net',
            webViewStatus: 'loading',
            progressionId: '',
            validateButtonStatus: 'visible',
          },
        }));
        const progressionId = '5435fE34decs024535';
        const progression = createProgression({
          _id: progressionId,
          engine: ENGINE.EXTERNAL,
          progressionContent: {
            type: CONTENT_TYPE.LEVEL,
            ref: '',
          },
        });
        const options = {
          services: {
            Progressions: {
              completeRemoteProgression: jest.fn(() => Promise.resolve(progression)),
            },
          },
        };
        const callback = jest.fn();
        await completeProgressionAndPersist(progressionId, callback)(dispatch, getState, options);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledTimes(1);
      });
    });

    describe('getRemoteCurrentProgressionId', () => {
      beforeEach(() => {
        jest.mock('p-retry');
      });
      it('throws an error if we cannot reach the server', async () => {
        const brand = createBrand();
        const authentication = createAuthenticationState({brand});
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({
          authentication,
          externalContent: {
            contentType: 'scorm',
            contentStatus: 'idle',
            contentUrl: 'https://scorm.net',
            webViewStatus: 'loading',
            progressionId: '',
            validateButtonStatus: 'visible',
          },
        }));
        const contentRef = 'extCont_234';

        const options = {
          services: {
            Progressions: {
              getRemoteCurrentProgressionId: jest.fn(() =>
                Promise.reject(new Error('server could not be reached')),
              ),
            },
          },
        };

        await getRemoteCurrentProgressionId(contentRef, 1)(dispatch, getState, options);
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(options.services.Progressions.getRemoteCurrentProgressionId).toHaveBeenCalledTimes(
          2,
        );
      });

      it('fetches the current progression id remotely', async () => {
        const brand = createBrand();
        const authentication = createAuthenticationState({brand});
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({
          authentication,
          externalContent: {
            contentType: 'scorm',
            contentStatus: 'idle',
            contentUrl: 'https://scorm.net',
            webViewStatus: 'loading',
            progressionId: '',
            validateButtonStatus: 'visible',
          },
        }));
        const contentRef = 'extCont_234';
        const progressionId = '5435fE34decs024535';

        const options = {
          services: {
            Progressions: {
              getRemoteCurrentProgressionId: jest.fn(() => Promise.resolve(progressionId)),
            },
          },
        };

        await getRemoteCurrentProgressionId(contentRef)(dispatch, getState, options);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).nthCalledWith(1, {
          payload: {
            progressionId,
          },
          type: ACTION_NAME,
        });
      });
    });
  });
});
