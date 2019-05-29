// @flow

import * as React from 'react';
import {connect} from 'react-redux';

import CatalogComponent from '../components/catalog';
import type {Props as ComponentProps} from '../components/catalog';
import {BrandThemeContext} from '../components/brand-theme-provider';
import type {DisciplineCard, ChapterCard} from '../layer/data/_types';
import {fetchCards} from '../redux/actions/catalog';
import translations from '../translations';
import {compareCards} from '../utils/content';
import type {DashboardSection} from '../types';

type ConnectedStateProps = {|
  dashboardSections: Array<DashboardSection>,
  items: Array<DisciplineCard | ChapterCard>,
  children?: React.Node
|};

type ConnectedDispatchProps = {|
  fetchCards: typeof fetchCards
|};

type Props = {|
  ...ConnectedStateProps,
  ...ConnectedDispatchProps,
  onPress: $PropertyType<ComponentProps, 'onPress'>,
  children?: $PropertyType<ComponentProps, 'children'>
|};

type State = {|
  isRefreshing: boolean
|};

class Catalog extends React.PureComponent<Props, State> {
  props: Props;

  state: State = {
    isRefreshing: false
  };

  componentDidMount() {
    this.fetchContent();
  }

  getVisibleSections = () => {
    return this.props.dashboardSections;
  };

  fetchContent = async () => {
    const visibleSections = this.getVisibleSections();
    await this.props.fetchCards(visibleSections, translations.getLanguage());
  };

  handleRefresh = () => {
    this.setState({isRefreshing: true});
    this.fetchContent()
      .then(() => this.setState({isRefreshing: false}))
      .catch(e => {
        this.setState({isRefreshing: false});
        // eslint-disable-next-line no-console
        console.error(e);
      });
  };

  render() {
    const {items, onPress, children} = this.props;
    const {isRefreshing} = this.state;
    const firstIsStarted = !(items[0] && items[0].completion === 0);

    return (
      <BrandThemeContext.Consumer>
        {brandTheme => (
          <CatalogComponent
            titleCover={firstIsStarted ? translations.finishLearning : translations.startLearning}
            titleCards={translations.forYou}
            items={items}
            onPress={onPress}
            onRefresh={this.handleRefresh}
            isRefreshing={isRefreshing}
          >
            {children}
          </CatalogComponent>
        )}
      </BrandThemeContext.Consumer>
    );
  }
}

const mapStateToProps = ({catalog, authentication, ...state}: StoreState): ConnectedStateProps => {
  const language = translations.getLanguage();
  const {brand} = authentication;

  return {
    dashboardSections: brand && brand.dashboardSections,
    items: Object.keys(catalog.entities.cards)
      .map(key => catalog.entities.cards[key][language])
      .filter(item => item !== undefined)
      .sort(compareCards)
  };
};

const mapDispatchToProps: ConnectedDispatchProps = {
  fetchCards
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);
