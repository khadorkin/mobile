// @flow
import AsyncStorage from '@react-native-community/async-storage';

const times = {};

const startTime = () => {
  const date = new Date();
  const t = `${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;

  times[t] = {
    start: date
  };

  return t;
};

window.getTimes = () => times;

const getTime = t => {
  const date = new Date();
  const startDate = times[t];
  const duration = date - startDate.start;

  times[t] = {
    ...times[t],
    end: date,
    duration
  };

  return `duration: ${duration}`;
};

export const store = async items => {
  const t = startTime();
  await AsyncStorage.multiSet(items);
  console.log(`[block-manager] store | ${getTime(t)}`, items);
};

export const storeOne = async (key, value) => {
  const t = startTime();
  const _value = typeof value === 'object' ? JSON.stringify(value) : value;
  await AsyncStorage.setItem(key, _value);
  console.log(`[block-manager] storeOne | ${getTime(t)} | ${key}`);
};

export const getItem = async key => {
  const t = startTime();
  const item = await AsyncStorage.getItem(key);
  console.log(`[block-manager] getItem | ${getTime(t)} | ${key}`);
  return item;
};

export const updateItem = async (key, newValue) => {
  const t = startTime();
  const _value = typeof newValue === 'object' ? JSON.stringify(newValue) : newValue;
  await AsyncStorage.mergeItem(key, _value);
  console.log('[block-manager] updateItem', getTime(t));
};

export const getBlock = async key => {
  const t = startTime();
  const block = await AsyncStorage.getItem(key);
  console.log('[block-manager] getBlock', getTime(t));
  return block;
};

export const remove = async key => {
  const t = startTime();
  await AsyncStorage.removeItem(key);
  console.log('[block-manager] remove', getTime(t));
};
