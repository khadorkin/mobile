// @flow strict

import * as React from 'react';

import CatalogSection, {ITEM_WIDTH} from '../components/catalog-section';
import type {Props as CatalogSectionProps} from '../components/catalog-section';

type Props = {|
  ...$Diff<
    CatalogSectionProps,
    {|
      onScroll: $PropertyType<CatalogSectionProps, 'onScroll'>
    |}
  >,
  onScroll: (offset: number, limit: number) => void
|};

export const DEBOUNCE_DURATION = 100;

class CatalogSectionRefreshable extends React.PureComponent<Props> {
  props: Props;

  timeout: TimeoutID;

  offsetX: number = 0;

  getOffset = (offsetX: number): number => Math.trunc(offsetX / ITEM_WIDTH);

  getLimit = (offsetX: number): number => {
    const {layout} = this.props;
    if (!layout) {
      return 1;
    }

    return Math.ceil(layout.width / ITEM_WIDTH) + 1;
  };

  handleScroll = ({nativeEvent}: ScrollEvent) => {
    const {onScroll, layout} = this.props;
    const offsetX = nativeEvent.contentOffset.x;

    if (offsetX !== this.offsetX && layout) {
      this.offsetX = offsetX;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (offsetX === this.offsetX) {
          onScroll(this.getOffset(offsetX), this.getLimit(offsetX));
        }
      }, DEBOUNCE_DURATION);
    }
  };

  render() {
    const {
      /* eslint-disable no-unused-vars */
      onScroll,
      /* eslint-enable no-unused-vars */
      ...remainingProps
    } = this.props;
    return <CatalogSection {...remainingProps} onScroll={this.handleScroll} />;
  }
}

export default CatalogSectionRefreshable;
