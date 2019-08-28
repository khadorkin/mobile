// @flow
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import type {ResourceType} from './_types';

const times = {};

const startTime = () => {
  const date = new Date();
  const t = `${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;

  times[t] = {
    start: date
  };

  return t;
};

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

const length = items => Object.keys(items).length;

// ----------------------------------------------------------

export const BLOCK_TYPES = {
  METADATA: 'metadata',
  CARDS: 'cards',
  CHAPTER_RULES: 'chapterRules',
  CHAPTERS: 'chapters',
  COMPLETIONS: 'completions',
  DISCIPLINES: 'disciplines',
  LEVELS: 'levels',
  EXIT_NODES: 'exitNodes',
  SLIDES: 'slides',
  PROGRESSIONS: 'progressions',
  LAST_PROGRESSIONS: 'lastProgressions'
};

export const getBlockType = (resourceType: ResourceType) => {
  switch (resourceType) {
    case 'chapterRule':
      return BLOCK_TYPES.CHAPTER_RULES;
    case 'chapter':
      return BLOCK_TYPES.CHAPTERS;
    case 'discipline':
      return BLOCK_TYPES.DISCIPLINES;
    case 'exitNode':
      return BLOCK_TYPES.EXIT_NODES;
    case 'card':
      return BLOCK_TYPES.CARDS;
    case 'level':
      return BLOCK_TYPES.LEVELS;
    case 'slide':
      return BLOCK_TYPES.SLIDES;
  }
};

const manager = {
  log: _.noop, // console.log
  queue: {},
  metadata: null,
  NB_ITEMS_PER_BLOCKS: 20,
  saveMetadata: () => AsyncStorage.setItem(BLOCK_TYPES.METADATA, JSON.stringify(manager.metadata))
};

export const resetManager = () => {
  manager.metadata = null;
  manager.metadataP = null;
};

manager.log({manager});

const addBlockTypeToMetadata = blockType => {
  manager.metadata[blockType] = {
    currentNum: 1,
    keyMap: {}
  };
  manager.log(`[block-manager] addBlockTypeToMetadata '${blockType}'`, manager.metadata);
  // await AsyncStorage.setItem('metadata', JSON.stringify(_metadata));
};

export const getBlock = async blockKey => {
  const t = startTime();
  try {
    const block = await AsyncStorage.getItem(blockKey);
    const _block = JSON.parse(block);
    manager.log(`[block-manager] getBlock | ${blockKey}`, getDuration(t));
    return _block;
  } catch (e) {
    manager.log(e);
    return null;
  }
};

const restoreMetadata = async () => {
  manager.log('[block-manager] restoreMetadata');
  let metadata = await getBlock(BLOCK_TYPES.METADATA);

  if (!metadata) {
    metadata = {};
  }

  manager.log('[block-manager] restoreMetadata -->', metadata);
  manager.metadata = metadata;
  return metadata;
};

const syncMetadata = async () => {
  if (manager.metadata) {
    manager.log('syncMetadata found metadata', manager.metadata);
    return Promise.resolve(manager.metadata);
  }

  if (!manager.metadataP) {
    manager.log('syncMetadata init promise');
    manager.metadataP = restoreMetadata();
  }

  manager.metadata = await manager.metadataP;
  manager.log('syncMetadata got metadata', manager.metadata);
  return manager.metadata;
};

// ---------------------------------

const getBlockKey = async (blockType, key) => {
  manager.log(`[block-manager] getBlockKey | ${blockType} | ${key}`);
  if (!manager.metadata[blockType]) {
    manager.log(`[block-manager] metadata has no block type ${blockType}`);
    return;
  }

  const blockKey = manager.metadata[blockType].keyMap[key];

  if (!blockKey) {
    manager.log(`[block-manager] metadata has no ${key} for block type ${blockType}`);
    return;
  }

  manager.log({blockKey});
  return blockKey;
};

export const getItem = async (blockType, key) => {
  const t = startTime();
  await syncMetadata();

  const blockKey = await getBlockKey(blockType, key);

  if (!blockKey) {
    return;
  }

  const block = await getBlock(blockKey);
  const item = block[key];
  manager.log(`[block-manager] getItem | ${getDuration(t)} | ${key}`, {key, item});
  return item;
};

export const updateItem = async (blockType, key, newValue) => {
  const t = startTime();
  await syncMetadata();

  manager.log('[block-manager] start updateItem', blockType, key);
  const blockKey = await getBlockKey(blockType, key);

  if (!blockKey) {
    return;
  }

  const block = await getBlock(blockKey);
  block[key] = newValue;
  await AsyncStorage.setItem(blockKey, block);
  manager.log('[block-manager] updateItem', getDuration(t));
};

const increaseBlockCursor = async blockType => {
  manager.metadata[blockType].currentNum++;
  manager.log(`[block-manager] increaseBlockCursor '${blockType}'`, manager.metadata);
};

const splitItems = (newItems, availableSpace) => {
  const keys = Object.keys(newItems);
  const keysToStoreNow = keys.slice(0, availableSpace);
  const keysToQueue = keys.slice(availableSpace);
  manager.log({keysToStoreNow, keysToQueue});

  const pickFromNewItems = (acc, k) => ({...acc, [k]: newItems[k]});
  const itemsToStoreNow = keysToStoreNow.reduce(pickFromNewItems, {});
  const itemsToQueue = keysToQueue.reduce(pickFromNewItems, {});

  return {itemsToStoreNow, itemsToQueue};
};

const updateQueue = (blockType, newItems, availableSpace) => {
  const {itemsToStoreNow, itemsToQueue} = splitItems(newItems, availableSpace);
  manager.log(
    `[block-manager] not enough room in this block, queueing on top ${length(itemsToQueue)} items`,
    itemsToQueue
  );
  manager.queue[blockType].splice(1, 0, itemsToQueue);

  return itemsToStoreNow;
};

const filterPreviouslyStoredItems = (keyMap, itemsToFilter) => {
  return Object.keys(itemsToFilter).reduce((acc, k) => {
    if (keyMap[k]) {
      return acc;
    }

    return {...acc, [k]: itemsToFilter[k]};
  }, {});
};

const storeBlock = async blockType => {
  const t = startTime();
  manager.log(`[block-manager] storeBlock '${blockType}'`);
  let newItems = manager.queue[blockType][0];

  if (!manager.metadata[blockType]) {
    addBlockTypeToMetadata(blockType);
  }

  newItems = filterPreviouslyStoredItems(manager.metadata[blockType].keyMap, newItems);

  let blockKey = `${blockType}-${manager.metadata[blockType].currentNum}`;

  manager.log(`[block-manager] storeBlock items queued: `, newItems);

  const currentBlock = await getBlock(blockKey);
  const currentItems = currentBlock || {};

  let remainingSpace = manager.NB_ITEMS_PER_BLOCKS - Object.keys(currentItems).length;
  manager.log({metadata: manager.metadata, remainingSpace, currentBlock});

  if (remainingSpace === 0) {
    await increaseBlockCursor(blockType);
    return storeBlock(blockType);
  }

  if (length(newItems) > remainingSpace) {
    const itemsToStoreNow = await updateQueue(blockType, newItems, remainingSpace);
    newItems = itemsToStoreNow;
  }

  const mergedItems = {
    ...currentItems,
    ...newItems
  };

  manager.log(
    `[block-manager] check to store on block '${blockKey}'(${Object.keys(currentItems).length})`,
    currentItems
  );
  manager.log(
    `[block-manager] want to add ${Object.keys(newItems).length} new items in block '${blockKey}'`,
    newItems
  );

  if (Object.keys(mergedItems).length > Object.keys(currentItems).length) {
    manager.log(
      `[block-manager] ready to store ${Object.keys(mergedItems).length} mergedItems`,
      mergedItems
    );

    await AsyncStorage.setItem(blockKey, JSON.stringify(mergedItems));

    manager.metadata[blockType].keyMap = Object.keys(mergedItems).reduce(
      (acc, k) => ({...acc, [k]: blockKey}),
      manager.metadata[blockType].keyMap
    );

    // await AsyncStorage.setItem(BLOCK_TYPES.METADATA, JSON.stringify(metadata));
    manager.log('[block-manager] updated metadata', manager.metadata);

    manager.log(
      `[block-manager] store done | ${getDuration(t)} | block: ${blockKey} | nbItems: ${
        Object.keys(mergedItems).length
      }`
    );
  } else {
    manager.log(`[block-manager] nothing to store! block is already containing these items`);
  }

  manager.queue[blockType].shift();

  if (manager.queue[blockType].length > 0) {
    manager.log(`[block-manager] next storing in queue for block '${blockType}'`);
    return storeBlock(blockType);
  }

  manager.log(
    `[block-manager] store queue done | block type '${blockType}' | nbItems: ${
      Object.keys(mergedItems).length
    }`
  );
  manager.log('[block-manager] recording metadata', manager.metadata);

  manager.saveMetadata();
};

export const store = async (blockType, items) => {
  manager.log('[block-manager] ==> store');
  await syncMetadata();

  if (manager.queue[blockType] && manager.queue[blockType].length > 0) {
    manager.log(`[block-manager] queueing for block type '${blockType}'`, items);
    manager.queue[blockType].push(items);
    return;
  }

  manager.log(`[block-manager] starting queue for block type '${blockType}'`);
  manager.queue[blockType] = [items];

  return storeBlock(blockType);
};

// @todo remove item from BLOCK + METADATA!
export const remove = async (blockType, key) => {
  const t = startTime();
  await AsyncStorage.removeItem(key);
  manager.log('[block-manager] remove', getDuration(t));
};

export const getAllItemsFromBlockType = async (blockType, filterKeys) => {
  const currentNum = manager.metadata[blockType].currentNum;
  const keys = _.range(currentNum).map(i => `${blockType}-${i + 1}`);
  manager.log('[block-manager] getAllItemsFromBlockType', blockType, keys);
  const pairs = await AsyncStorage.multiGet(keys);
  manager.log({pairs});
  return pairs.reduce((acc, pair) => {
    const block = JSON.parse(pair[1]);
    let itemKeys = Object.keys(block);
    if (filterKeys) {
      itemKeys = filterKeys(itemKeys);
    }

    const blockArray = itemKeys.reduce((_acc, itemKey) => {
      return _acc.concat(block[itemKey]);
    }, []);

    manager.log({blockArray});
    return acc.concat(blockArray);
  }, []);
};
