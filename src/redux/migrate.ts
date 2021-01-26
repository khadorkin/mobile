import {
  initialState as NotificationsSettingsInitialState,
  State as NotificationSettingsState,
} from './notifications/settings';
import {
  initialState as ScheduledNotificationsInitialState,
  State as ScheduledNotificationsState,
} from './notifications/scheduled';

interface Migration<T> {
  [key: number]: (state: T) => T;
}

const migrateSettings = (initialState, currentState) => {
  const newState = Object.assign({...initialState}, currentState);
  const newCurrentState = Object.entries(newState).reduce((acc, [key, params]) => {
    acc[key] = {
      ...params,
      label: initialState[key].label,
    };
    return acc;
  }, {});
  return newCurrentState;
};

const createMigration = <
  T extends {
    notifications: {
      settings: NotificationSettingsState;
      scheduledNotifications: ScheduledNotificationsState;
    };
  }
>(): Migration<T> => {
  return {
    3: (state: T) => {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          scheduledNotifications: Object.assign(
            ScheduledNotificationsInitialState,
            state.notifications.scheduledNotifications,
          ),
          settings: migrateSettings(
            NotificationsSettingsInitialState,
            state.notifications.settings,
          ),
        },
      };
    },
  };
};

export default createMigration;
