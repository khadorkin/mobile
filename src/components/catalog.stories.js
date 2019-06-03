// @flow

import * as React from 'react';
import {Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import renderer from 'react-test-renderer';

import {createCardLevel, createDisciplineCard, createChapterCard} from '../__fixtures__/cards';
import {CARD_STATUS} from '../layer/data/_const';
import {handleFakePress} from '../utils/tests';
import {AUTHOR_TYPE} from '../const';
import {__TEST__} from '../modules/environment';
import Catalog from './catalog';

// This is for the loader
if (__TEST__) {
  jest.useFakeTimers();
}

const level = createCardLevel({ref: 'mod_1', status: CARD_STATUS.ACTIVE, label: 'Fake level'});
const discipline = createDisciplineCard({
  ref: 'dis_1',
  completion: 0,
  levels: [level],
  title: 'Fake discipline'
});
const chapter = createChapterCard({
  ref: 'cha_1',
  completion: 0,
  title: 'Fake chapter',
  status: CARD_STATUS.ACTIVE
});
const chapterNew = createChapterCard({
  ref: 'cha_2',
  completion: 0,
  title: 'Fake chapter',
  status: CARD_STATUS.ACTIVE,
  isNew: true,
  authors: [{authorType: AUTHOR_TYPE.CUSTOM, label: 'custom', ref: 'part_VyFl5hZ3V'}]
});
const disciplineNew = createDisciplineCard({
  ref: 'dis_2',
  completion: 0,
  levels: [level],
  title: 'Fake discipline',
  isNew: true,
  authors: [{authorType: AUTHOR_TYPE.CUSTOM, label: 'custom', ref: 'part_VyFl5hZ3V'}]
});

storiesOf('Catalog', module)
  .add('Items', () => (
    <Catalog
      titleCover="Title Cover"
      titleCards="Title Cards"
      items={[discipline, chapter, discipline, chapterNew, disciplineNew]}
      onPress={handleFakePress}
      onRefresh={handleFakePress}
    />
  ))
  .add('Loading', () => (
    <Catalog
      titleCover="Title Cover"
      titleCards="Title Cards"
      items={[]}
      onPress={handleFakePress}
      onRefresh={handleFakePress}
    />
  ))
  .add('With children', () => (
    <Catalog
      titleCover="Title Cover"
      onRefresh={handleFakePress}
      titleCards="Title Cards"
      items={[discipline, chapter, discipline, chapterNew, disciplineNew]}
      onPress={handleFakePress}
    >
      <Text>I am a child</Text>
    </Catalog>
  ));

if (__TEST__) {
  describe('Catalog', () => {
    it('should see cover New badge', () => {
      const handlePress = jest.fn();
      const component = renderer.create(
        <Catalog
          titleCover="Title Cover"
          titleCards="Title Cards"
          items={[chapterNew, discipline, chapter]}
          onPress={handlePress}
          onRefresh={handleFakePress}
        />
      );
      const catalogItem = component.root.find(el => el.props.testID === 'catalog-item-dis-1');
      catalogItem.props.onPress();
      expect(handlePress.mock.calls.length).toBe(1);
      expect(handlePress.mock.calls[0]).toEqual([discipline]);
    });
    it('should handle onItemPress callback on discipline', () => {
      const handlePress = jest.fn();
      const component = renderer.create(
        <Catalog
          titleCover="Title Cover"
          titleCards="Title Cards"
          items={[discipline, chapter]}
          onPress={handlePress}
          onRefresh={handleFakePress}
        />
      );
      const catalogItem = component.root.find(el => el.props.testID === 'catalog-item-dis-1');
      catalogItem.props.onPress();
      expect(handlePress.mock.calls.length).toBe(1);
      expect(handlePress.mock.calls[0]).toEqual([discipline]);
    });

    it('should handle onItemPress callback on chapter', () => {
      const handlePress = jest.fn();
      const component = renderer.create(
        <Catalog
          titleCover="Title Cover"
          titleCards="Title Cards"
          items={[discipline, chapter]}
          onPress={handlePress}
          onRefresh={handleFakePress}
        />
      );
      const catalogItem = component.root.find(el => el.props.testID === 'catalog-item-cha-1');
      catalogItem.props.onPress();
      expect(handlePress.mock.calls.length).toBe(1);
      expect(handlePress.mock.calls[0]).toEqual([chapter]);
    });
  });
}
