// @flow

import * as React from 'react';
import {View} from 'react-native';

import type {Chapter, Discipline} from '../layer/data/_types';
import type {Progression} from '../types';
import {getCleanUri} from '../modules/uri';
import {DISPLAY_MODE} from '../const';
import Button from './button';
import Space from './space';
import CatalogItem from './catalog-item';

export type Item = Discipline | Chapter;

type Props = {|
  items: Array<Item>,
  onPress: (item: Item) => void
|};

class Catalog extends React.PureComponent<Props> {
  props: Props;

  handlePress = (item: Item) => () => this.props.onPress(item);

  render() {
    const {items} = this.props;

    // @todo Replace progression with user data
    const progression: Progression = {
      current: 3,
      count: 10
    };

    return (
      <View testID="catalog">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <Space />}
            <CatalogItem
              title={item.name}
              subtitle="Coorpacademy"
              progression={progression}
              image={{
                uri: getCleanUri(
                  '//static.coorpacademy.com/content/CoorpAcademy/content-catalogue/cockpit-tutorial-course/default/1506521408352ugur-akdemir-238673-1520268270065.jpg'
                )
              }}
              authorType="CUSTOM EDITOR"
              badge="New"
              isInfinite
              mode={DISPLAY_MODE.CARD}
              isCertified
            />
          </React.Fragment>
        ))}
      </View>
    );
  }
}

export default Catalog;
