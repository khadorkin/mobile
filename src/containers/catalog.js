// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {createArraySelector} from 'reselect-map';

import CatalogComponent, {SEPARATOR_HEIGHT, HERO_HEIGHT} from '../components/catalog';
import type {Props as ComponentProps} from '../components/catalog';
import {HEIGHT as SECTION_HEIGHT} from '../components/catalog-section';
import {fetchSections} from '../redux/actions/catalog/sections';
import type {StoreState} from '../redux/store';
import translations from '../translations';
import isEqual from '../modules/equal';
import {getOffsetWithoutCards, getLimitWithoutCards, isEmptySection} from '../modules/sections';
import type {Section} from '../types';
import withLayout from './with-layout';
import type {WithLayoutProps} from './with-layout';

export type ConnectedStateProps = {|
  sections: Array<Section | void>
|};

type ConnectedDispatchProps = {|
  fetchSections: typeof fetchSections
|};

export type OwnProps = {|
  onCardPress: $PropertyType<ComponentProps, 'onCardPress'>,
  children?: $PropertyType<ComponentProps, 'children'>
|};

type Props = {|
  ...ConnectedStateProps,
  ...ConnectedDispatchProps,
  ...WithLayoutProps,
  ...OwnProps
|};

type State = {|
  isRefreshing: boolean
|};

export const DEFAULT_LIMIT = 4;
export const DEBOUNCE_DURATION = 100;

class Catalog extends React.Component<Props, State> {
  props: Props;

  state: State = {
    isRefreshing: false
  };

  timeout: TimeoutID;

  offsetY: number = 0;

  componentDidMount() {
    this.fetchSections(0, this.getLimit(0));
  }

  shouldComponentUpdate({sections: nextSections, ...nextProps}: Props, nextState: State) {
    const {sections, ...props} = this.props;
    const emptySections = sections.filter(s => s && isEmptySection(s));
    const nextEmptySections = nextSections.filter(s => s && isEmptySection(s));
    const placeholderSections = sections.filter(s => s && s.cardsRef === undefined);
    const nextPlaceholderSections = nextSections.filter(s => s && s.cardsRef === undefined);

    // For performance purpose only (prevent useless render)
    return (
      sections.length !== nextSections.length ||
      emptySections.length !== nextEmptySections.length ||
      placeholderSections.length !== nextPlaceholderSections.length ||
      !isEqual(this.state, nextState) ||
      !isEqual(props, nextProps)
    );
  }

  componentDidUpdate(prevProps: Props) {
    const {sections} = this.props;
    const emptySections = sections.filter(section => section && isEmptySection(section));
    const previousEmptySections = prevProps.sections.filter(
      section => section && isEmptySection(section)
    );

    if (emptySections.length !== previousEmptySections.length) {
      const offset = this.getOffset();
      const limit = this.getLimit(offset);
      const hasUnfetchedSections = this.hasUnfetchedSections(offset, limit);

      if (hasUnfetchedSections) {
        this.fetchSections(offset, limit);
      }
    }
  }

  fetchSections = async (offset: number, limit: number, forceRefresh?: boolean = false) => {
    await this.props.fetchSections(offset, limit, forceRefresh);
  };

  handleRefresh = () => {
    this.setState({isRefreshing: true});
    this.fetchSections(0, this.getLimit(0), true)
      .then(() => this.setState({isRefreshing: false}))
      .catch(e => {
        this.setState({isRefreshing: false});
        // eslint-disable-next-line no-console
        console.error(e);
      });
  };

  getOffset = (): number => {
    const {sections} = this.props;

    const offsetY = this.offsetY > HERO_HEIGHT ? this.offsetY - HERO_HEIGHT : 0;
    const offset = Math.trunc(offsetY / (SECTION_HEIGHT + SEPARATOR_HEIGHT));
    return getOffsetWithoutCards(sections, offset);
  };

  getLimit = (offset: number): number => {
    const {layout, sections} = this.props;
    if (!layout || sections.length === 0) {
      return DEFAULT_LIMIT;
    }

    const limit = Math.ceil(layout.height / (SECTION_HEIGHT + SEPARATOR_HEIGHT) + 1);

    return getLimitWithoutCards(sections, offset, limit);
  };

  hasUnfetchedSections = (offset: number, limit: number): boolean => {
    const {sections} = this.props;

    return sections.slice(offset, offset + limit).findIndex(section => !section) !== -1;
  };

  handleScroll = ({nativeEvent}: ScrollEvent) => {
    const {layout} = this.props;
    const offsetY = nativeEvent.contentOffset.y;

    if (offsetY !== this.offsetY && layout) {
      this.offsetY = offsetY;

      const offset = this.getOffset();
      const limit = this.getLimit(offset);
      const hasUnfetchedSections = this.hasUnfetchedSections(offset, limit);

      if (hasUnfetchedSections) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          if (this.offsetY === offsetY) {
            this.fetchSections(offset, limit);
          }
        }, DEBOUNCE_DURATION);
      }
    }
  };

  render() {
    const {sections, onCardPress, children} = this.props;
    const {isRefreshing} = this.state;

    return (
      <CatalogComponent
        sections={sections.filter(section => !(section && isEmptySection(section)))}
        onCardPress={onCardPress}
        onRefresh={this.handleRefresh}
        isRefreshing={isRefreshing}
        onScroll={this.handleScroll}
      >
        {children}
      </CatalogComponent>
    );
  }
}

const getSections = (state: StoreState) => state.catalog.entities.sections;
const getSectionsRef = (state: StoreState) => state.catalog.sectionsRef || [];
const getSectionsState = createArraySelector(
  [getSectionsRef, getSections],
  (sectionRef, sections) =>
    sectionRef && sections[sectionRef] && sections[sectionRef][translations.getLanguage()]
);

export const mapStateToProps = (state: StoreState): ConnectedStateProps => ({
  sections: getSectionsState(state)
});

const mapDispatchToProps: ConnectedDispatchProps = {
  fetchSections
};

export {Catalog as Component};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLayout(Catalog));
