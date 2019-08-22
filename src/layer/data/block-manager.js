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

const getDuration = t => {
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

// ----------------------------------------------------------

const queue = {};

// ----------------------------------------------------------

export const getItem = async key => {
  const t = startTime();
  const item = await AsyncStorage.getItem(key);
  console.log(`[block-manager] getItem | ${getDuration(t)} | ${key}`, {key, item});
  return item;
};

const storeBlock = async blockKey => {
  const t = startTime();
  console.log(`[block-manager] storeBlock '${blockKey}'`);
  const newItems = queue[blockKey][0];

  console.log(`[block-manager] storeBlock items queued: `, newItems);

  const currentBlock = await getItem(blockKey);
  const currentItems = currentBlock ? JSON.parse(currentBlock) : {};

  const mergedItems = {
    ...currentItems,
    ...newItems
  };

  console.log(
    `[block-manager] check to store on block '${blockKey}'(${Object.keys(currentItems).length})`,
    currentItems
  );
  console.log(
    `[block-manager] want to add ${Object.keys(newItems).length} new items in block '${blockKey}'`,
    newItems
  );

  if (Object.keys(mergedItems).length > Object.keys(currentItems).length) {
    console.log(
      `[block-manager] ready to store ${Object.keys(mergedItems).length} mergedItems`,
      mergedItems
    );
    await AsyncStorage.setItem(blockKey, JSON.stringify(mergedItems));
    console.log(
      `[block-manager] store done | ${getDuration(t)} | block: ${blockKey} | nbItems: ${
        Object.keys(mergedItems).length
      }`
    );
  } else {
    console.log(`[block-manager] nothing to store! block is already containing these items`);
  }

  queue[blockKey].shift();

  if (queue[blockKey].length > 0) {
    console.log(`[block-manager] next storing in queue for block '${blockKey}'`);
    storeBlock(blockKey);
    return;
  }

  console.log(
    `[block-manager] store queue done | block: ${blockKey} | nbItems: ${
      Object.keys(mergedItems).length
    }`
  );
};

export const store = async (blockKey, items) => {
  console.log('[block-manager] store');

  if (queue[blockKey] && queue[blockKey].length > 0) {
    console.log(`[block-manager] queueing for block '${blockKey}'`, items);
    queue[blockKey].push(items);
    return;
  }

  console.log(`[block-manager] starting queue for block '${blockKey}'`);
  queue[blockKey] = [items];

  storeBlock(blockKey);
};

export const storeOne = async (key, value) => {
  const t = startTime();
  const _value = typeof value === 'object' ? JSON.stringify(value) : value;
  await AsyncStorage.setItem(key, _value);
  console.log(`[block-manager] storeOne | ${getDuration(t)} | ${key}`);
};

export const updateItem = async (key, newValue) => {
  const t = startTime();
  const _value = typeof newValue === 'object' ? JSON.stringify(newValue) : newValue;
  await AsyncStorage.mergeItem(key, _value);
  console.log('[block-manager] updateItem', getDuration(t));
};

export const getBlock = async key => {
  const t = startTime();
  const block = await AsyncStorage.getItem(key);
  console.log('[block-manager] getBlock', getDuration(t));
  return block;
};

export const remove = async key => {
  const t = startTime();
  await AsyncStorage.removeItem(key);
  console.log('[block-manager] remove', getDuration(t));
};
