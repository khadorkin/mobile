import * as React from 'react';
import renderer from 'react-test-renderer';

import {createNavigation} from '../__fixtures__/navigation';
import {createChapterCard, createExtCard} from '../__fixtures__/cards';
import {CARD_STATUS} from '../layer/data/_const';
import {TestContextProvider} from '../utils/tests';

const card = createChapterCard({
  ref: 'bar',
  completion: 0,
  title: 'Fake chapter',
  status: CARD_STATUS.ACTIVE,
});

const externalContentCard = createExtCard({
  ref: 'extCont_123',
  completion: 0,
  title: 'Fake ExternalContent',
  status: CARD_STATUS.ACTIVE,
});

describe('Search', () => {
  it('should handle card press and navigate to Slide', () => {
    const {Component: Seach} = require('./search');

    const selectCard = jest.fn();
    const navigation = createNavigation({});
    const component = renderer.create(
      <TestContextProvider>
        <Seach navigation={navigation} selectCard={selectCard} />
      </TestContextProvider>,
    );

    const search = component.root.find((el) => el.props.testID === 'search');
    search.props.onCardPress(card);

    expect(navigation.navigate).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledWith('Slide');
    expect(selectCard).toHaveBeenCalledTimes(1);
    expect(selectCard).toHaveBeenCalledWith(card);
  });

  it('should handle card press and navigate to ExternalContent', () => {
    const {Component: Seach} = require('./search');

    const selectCard = jest.fn();
    const navigation = createNavigation({});
    const component = renderer.create(
      <TestContextProvider>
        <Seach navigation={navigation} selectCard={selectCard} />
      </TestContextProvider>,
    );

    const search = component.root.find((el) => el.props.testID === 'search');
    search.props.onCardPress(externalContentCard);

    expect(navigation.navigate).nthCalledWith(1, 'ExternalContent', {
      contentRef: 'extCont_123',
      contentType: 'scorm',
    });
    expect(selectCard).toHaveBeenCalledTimes(1);
    expect(selectCard).toHaveBeenCalledWith(externalContentCard);
  });

  it('should handle search press', () => {
    const {Component: Search} = require('./search');

    const selectCard = jest.fn();
    const navigation = createNavigation({});
    const component = renderer.create(
      <TestContextProvider>
        <Search navigation={navigation} selectCard={selectCard} />
      </TestContextProvider>,
    );

    const search = component.root.find((el) => el.props.testID === 'search');
    search.props.onBackPress();

    expect(navigation.navigate).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledWith('Home');

    component.unmount();
  });
});
