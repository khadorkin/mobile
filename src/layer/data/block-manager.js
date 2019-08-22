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
const NB_ITEMS_PER_BLOCKS = 20;

// ----------------------------------------------------------

export const getItem = async key => {
  const t = startTime();
  const item = await AsyncStorage.getItem(key);
  console.log(`[block-manager] getItem | ${getDuration(t)} | ${key}`, {key, item});
  return item;
};

export const increaseBlockCursor = async blockType => {
  let metadata = await getItem('metadata');

  metadata = {
    [blockType]: {
      currentNum: metadata ? metadata[blockType].currentNum + 1 : 1
    }
  };

  await AsyncStorage.setItem('metadata', metadata);
  console.log(`[block-manager] increaseB '${blockType}'`, metadata);
  return metadata;
};

export const getWritingBlockData = async blockType => {
  let metadata = await getItem('metadata');

  if (!metadata) {
    metadata = await increaseBlockCursor(blockType);
  }

  const blockData = metadata[blockType];

  return {
    blockKey: `${blockType}-${blockData.currentNum}`
  };
};

const length = items => Object.keys(items).length;

const storeBlock = async blockType => {
  const t = startTime();
  console.log(`[block-manager] storeBlock '${blockType}'`);
  let newItems = queue[blockType][0];
  const {blockKey} = await getWritingBlockData(blockType);

  console.log(`[block-manager] storeBlock items queued: `, newItems);

  const currentBlock = await getItem(blockKey);
  const currentItems = currentBlock ? JSON.parse(currentBlock) : {};
  const remainingSpace = NB_ITEMS_PER_BLOCKS - Object.keys(currentItems).length;

  if (length(newItems) > remainingSpace) {
    const newItemsRemaining = newItems.slice(remainingSpace);
    console.log(
      `[block-manager] not enough room in this block, queueing on top ${length(
        newItemsRemaining
      )} items`,
      newItemsRemaining
    );
    newItems = newItems.slice(0, remainingSpace);
    queue[blockType].splice(1, 0, newItemsRemaining);
    await increaseBlockCursor(blockType);
  }

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

  queue[blockType].shift();

  if (queue[blockType].length > 0) {
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

export const store = async (blockType, items) => {
  console.log('[block-manager] store');

  if (queue[blockType] && queue[blockType].length > 0) {
    console.log(`[block-manager] queueing for block type '${blockType}'`, items);
    queue[blockType].push(items);
    return;
  }

  console.log(`[block-manager] starting queue for block type '${blockType}'`);
  queue[blockType] = [items];

  storeBlock(blockType);
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
