// @todo add flow coverage
// @todo remove lodash
import reduce from 'lodash/fp/reduce';
// @todo remove lodash
import set from 'lodash/fp/set';
import {createState} from '@coorpacademy/progression-engine';

const progressionStore = reduce(
  (progressionMap, progression) => {
    const newState = createState(progression);
    progressionMap.set(progression._id, set('state', newState, progression));
    return progressionMap;
  },
  new Map(),
  {}
);

// eslint-disable-next-line require-await
const findById = async id => {
  if (!progressionStore.has(id)) throw new Error('Progression not found');
  return progressionStore.get(id);
};

const getAll = () => {
  return [...progressionStore.values()];
};

const save = progression => {
  progressionStore.set(progression._id, progression);
};

export {save, getAll, findById};