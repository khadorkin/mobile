// @flow strict

import {AsyncStorage} from 'react-native';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import type {Reducer} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import type {PersistConfig} from 'redux-persist/lib/types';
import {middlewares, reducers as storeReducers} from '@coorpacademy/player-store';
import type {ReduxState} from '@coorpacademy/player-store';

import type {State as NavigationState} from './reducers/navigation';
import type {State as BundleState} from './reducers/bundle';
import type {State as CatalogState} from './reducers/catalog';
import type {State as PermissionsState} from './reducers/permissions';
import type {State as AuthenticationState} from './reducers/authentication';
import type {State as VideoState} from './reducers/video';
import type {State as GodModeState} from './reducers/godmode';
import type {State as ErrorState} from './reducers/ui/error';
import navigation from './reducers/navigation';
import bundle from './reducers/bundle';
import catalog from './reducers/catalog';
import authentication from './reducers/authentication';
import permissions from './reducers/permissions';
import video from './reducers/video';
import godmode from './reducers/godmode';
import error from './reducers/ui/error';
import Bundle from './middlewares/bundle';
import ResetDisplayedProgression from './middlewares/reset-displayed-progression';
import ProgressionsSynchronization from './middlewares/progressions-synchronization';
import UpdateCardOnProgressionUpdate from './middlewares/update-card-on-progression-update';
import ErrorHandler from './middlewares/error-handler';
import resetOnLogout from './utils/reset-on-logout';
import type {Options, ReduxDevTools, StoreAction} from './_types';

export type StoreState = $Exact<{|
  ...$Exact<ReduxState>,
  navigation: NavigationState,
  bundle: BundleState,
  catalog: CatalogState,
  authentication: AuthenticationState,
  permissions: PermissionsState,
  video: VideoState,
  error: ErrorState<void>,
  godmode: GodModeState
|}>;

const {ErrorLogger, ReduxThunkMemoized} = middlewares;
const {data, ui} = storeReducers;

type Reducers = {|
  data: typeof data,
  ui: typeof ui,
  error: typeof error,
  navigation: typeof navigation,
  bundle: typeof bundle,
  catalog: typeof catalog,
  authentication: Reducer<AuthenticationState, StoreAction<*>>,
  permissions: typeof permissions,
  video: typeof video,
  godmode: typeof godmode
|};

const reducers: Reducers = {
  data: resetOnLogout(data),
  ui: resetOnLogout(ui),
  error,
  navigation,
  bundle: resetOnLogout(bundle),
  catalog: resetOnLogout(catalog),
  authentication: resetOnLogout(authentication),
  permissions,
  video,
  godmode
};

const createMiddlewares = (options: Options, reduxDevTools?: ReduxDevTools) => {
  return compose(
    // $FlowFixMe error applying middlewares with multiple types
    applyMiddleware(
      ReduxThunkMemoized(options),
      ErrorLogger(options),
      Bundle(options),
      ResetDisplayedProgression(options),
      ProgressionsSynchronization(options),
      UpdateCardOnProgressionUpdate(options),
      ErrorHandler()
    ),
    // $FlowFixMe
    reduxDevTools || (f => f)
  );
};

const PERSIST_CONFIG: PersistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['bundle'],
  // $FlowFixMe https://github.com/rt2zz/redux-persist/issues/786
  timeout: null
};

type Persistor = $ReturnType<typeof persistStore>;

export const create = (
  options: Options,
  reduxDevTools?: ReduxDevTools
): {store: StoreState, persistor: Persistor} => {
  const rootReducer = combineReducers(reducers);
  const persistedReducer = persistReducer(PERSIST_CONFIG, rootReducer);
  // $FlowFixMe
  const store = createStore(persistedReducer, createMiddlewares(options, reduxDevTools));

  const persistor = persistStore(store);

  return {store, persistor};
};

export default create;
