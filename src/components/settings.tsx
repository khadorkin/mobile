import * as React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {ANALYTICS_EVENT_TYPE, NOTIFICATION_SETTINGS_STATUS, SPACE} from '../const';
import theme from '../modules/theme';
import {NotificationSettingStatus, NotificationSettingType} from '../types';
import withAnalytics, {WithAnalyticsProps} from '../containers/with-analytics';
import translations from '../translations';
import Switch from './switch';
import Version from './version';
import Text from './text';
import Space from './space';

export type SettingsItem = {
  type: NotificationSettingType;
  label: string;
  status: NotificationSettingStatus;
};

interface Props extends WithAnalyticsProps {
  settings: Array<SettingsItem>;
  onSettingToggle: (type: NotificationSettingType) => Promise<void>;
  testID: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    backgroundColor: theme.colors.white,
    height: 1,
    shadowColor: theme.colors.black,
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 9,
  },
  headerContainer: {
    height: 180,
  },
  titleContainer: {
    height: 110,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 37,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.gray.light,
  },
  title: {
    fontSize: theme.fontSize.xlarge,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.black,
  },
  text: {
    fontSize: theme.fontSize.large,
    color: theme.colors.black,
  },
  notificationItemContainer: {
    flexDirection: 'row',
    height: 53,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 37,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  version: {
    backgroundColor: theme.colors.gray.extra,
    color: theme.colors.gray.medium,
    paddingBottom: theme.spacing.base,
    paddingTop: theme.spacing.small,
  },
});

const Settings = ({settings, onSettingToggle, analytics, testID}: Props) => {
  function renderItem({item, index}: {index: number; item: SettingsItem}) {
    async function handleOnSettingsItemToggle() {
      analytics?.logEvent(ANALYTICS_EVENT_TYPE.NOTIFICATIONS_TOGGLE, {
        type: item.type,
        value: item.status,
      });
      await onSettingToggle(item.type);
    }
    return (
      <React.Fragment>
        {index % settings.length !== 1 ? <Separator /> : null}
        <View style={styles.notificationItemContainer}>
          <Text style={styles.text}>{translations[item.label]}</Text>
          <Switch
            isActive={item.status === NOTIFICATION_SETTINGS_STATUS.ACTIVATED}
            onPress={handleOnSettingsItemToggle}
            testID={testID + '-switch-' + item.type}
          />
        </View>
        {index % settings.length !== 0 ? <Separator /> : null}
      </React.Fragment>
    );
  }

  function Separator() {
    return <View style={styles.separator} />;
  }

  function keyExtractor(item: SettingsItem) {
    return item.type;
  }

  const [mainSetting, ...otherSettings] = settings;

  return (
    <React.Fragment>
      <FlatList
        testID={testID + 'list'}
        contentContainerStyle={styles.container}
        ListHeaderComponentStyle={styles.headerContainer}
        ListHeaderComponent={
          <React.Fragment>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{translations.notifications}</Text>
            </View>
            <View>
              {/* @ts-ignore - we can just ignore the index to have both separators */}
              {renderItem({item: mainSetting})}
              <Space type={SPACE.BASE} />
            </View>
          </React.Fragment>
        }
        data={otherSettings}
        ItemSeparatorComponent={Separator}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <Version style={styles.version} />
    </React.Fragment>
  );
};

export {Settings as Component};
export default withAnalytics(Settings);
