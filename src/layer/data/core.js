// @flow
import type {SupportedLanguage} from '../../translations/_types';
import {
  getItem as getItemFromBlocks,
  getAllItemsFromBlockType,
  getBlockType
} from './block-manager';
import type {Resource, ResourceType} from './_types';

export const buildKey = (resourceType: ResourceType, language: SupportedLanguage, ref: string) =>
  `${resourceType}:${language}:${ref}`;

export const getItem = async (
  resourceType: ResourceType,
  language: SupportedLanguage,
  ref: string
): Promise<Resource> => {
  const key = buildKey(resourceType, language, ref);
  try {
    const item = await getItemFromBlocks(getBlockType(resourceType), key);
    return item;
  } catch (e) {
    throw new Error(`Resource not found with ref: ${ref}`);
  }
};

export const filterKeys = (regex: RegExp) => (keys: Array<string>): Array<string> =>
  keys.filter((key: string) => key.match(regex));

export const getItemsPerResourceType = async (
  resourceType: ResourceType,
  language: SupportedLanguage
) => {
  const regex = new RegExp(`^(${resourceType}:${language}:(.+)+)`, 'gm');
  const items = await getAllItemsFromBlockType(getBlockType(resourceType), filterKeys(regex));
  return items;
};

export default {
  getItem,
  buildKey,
  getItemsPerResourceType
};
