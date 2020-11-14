import createMigration from './migrate';

describe('CreateMigration', () => {
  it('migrates the persited store', () => {
    const versionToMigrateTo = 3;
    const migrations = createMigration();
    const oldState = {
      notifications: {
        scheduledNotifications: {
          'finish-course': [],
        },
        settings: {
          'finish-course': {
            label: 'currently Doing Reminder',
            status: 'activated',
          },
          suggestion: {
            label: 'Suggestion',
            status: 'activated',
          },
        },
      },
    };
    const expected = {
      notifications: {
        scheduledNotifications: {
          'finish-course': [],
          suggestion: [],
        },
        settings: {
          authorizeAll: {
            label: 'authorizeNotifications',
            status: 'idle',
          },
          'finish-course': {
            label: 'currentlyDoingReminder',
            status: 'activated',
          },
          suggestion: {
            label: 'suggestion',
            status: 'activated',
          },
        },
      },
    };
    const newState = migrations[versionToMigrateTo](oldState);
    expect(newState).toEqual(expected);
  });
});

export default createMigration;
