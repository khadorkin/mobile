// @flow

import * as React from 'react';
import DeckSwiper from '@coorpacademy/react-native-deck-swiper';

import theme from '../modules/theme';
import type {CardType, Resource} from '../types';

export type Card = {|
  title: string,
  type: CardType,
  resource?: Resource
|};

export type Props = {|
  items: Array<Card>,
  renderItem: Card => React.Node,
  cardStyle?: GenericStyleProp,
  onRef?: (element: DeckSwiper | null) => void
|};

type State = {|
  cardIndexShown: number
|};

class Cards extends React.PureComponent<Props, State> {
  props: Props;

  state: State = {
    cardIndexShown: 0
  };

  handleSwiped = (cardIndexSwiped: number) => {
    this.setState({cardIndexShown: cardIndexSwiped + 1});
  };

  handleSwipedAll = () => {
    this.setState({cardIndexShown: 0});
  };

  render() {
    const {items, renderItem, cardStyle, onRef} = this.props;
    return (
      <DeckSwiper
        cards={items}
        onSwiped={this.handleSwiped}
        onSwipedAll={this.handleSwipedAll}
        cardIndex={this.state.cardIndexShown}
        renderCard={renderItem}
        stackSize={items.length}
        infinite
        animateCardOpacity
        cardVerticalMargin={0}
        stackSeparation={15}
        stackScale={5}
        backgroundColor="transparent"
        cardHorizontalMargin={theme.spacing.base}
        cardStyle={cardStyle}
        ref={onRef}
      />
    );
  }
}

export default Cards;
