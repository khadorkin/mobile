// @flow

import * as React from 'react';
import {connect} from 'react-redux';

import type {DisciplineCard, ChapterCard} from '../layer/data/_types';
import {isSearchFetching as _isSearchFetching, getSearchValue} from '../redux/utils/state-extract';
import {edit as _editSearch} from '../redux/actions/ui/search';
import {
  fetchCards as _fetchCards,
  DEFAULT_LIMIT
} from '../redux/actions/catalog/cards/fetch/search';
import {clearSearch as _clearSearch} from '../redux/actions/catalog/cards/clear';

import SearchComponent from '../components/search';

export type Params = {|
  url: string
|};

export type ConnectedStateProps = {|
  isSearchFetching: boolean,
  searchValue?: string
|};

type ConnectedDispatchProps = {|
  editSearch: typeof _editSearch,
  fetchCards: typeof _fetchCards,
  clearSearch: typeof _clearSearch
|};

export type Props = {|
  ...ConnectedStateProps,
  ...ConnectedDispatchProps,
  ...ReactNavigation$ScreenPropsWithParams<Params>,
  onCardPress: (item: DisciplineCard | ChapterCard) => void,
  onBackPress: () => void
|};

export const SEARCH_DEBOUNCE_DURATION = 500;
export const SEARCH_MIN_LENGTH = 2;

class Search extends React.PureComponent<Props> {
  props: Props;

  timeout: TimeoutID;

  searchValue: string | void;

  componentWillUnmount() {
    this.props.clearSearch();
    this.props.editSearch('');
  }

  handleSearchInputChange = (value: string) => {
    this.searchValue = value;
    this.props.editSearch(value);

    if (value.length >= SEARCH_MIN_LENGTH) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (this.searchValue === value) {
          this.props.fetchCards(value, 0, DEFAULT_LIMIT, true);
        }
      }, SEARCH_DEBOUNCE_DURATION);
    }

    if (value.length === 0) {
      this.props.clearSearch();
    }
  };

  render() {
    const {searchValue, isSearchFetching, onCardPress, onBackPress} = this.props;
    return (
      <SearchComponent
        testID="search"
        searchValue={searchValue}
        onCardPress={onCardPress}
        onBackPress={onBackPress}
        isSearchFetching={isSearchFetching}
        onSearchInputChange={this.handleSearchInputChange}
      />
    );
  }
}

export const mapStateToProps = (state: StoreState): ConnectedStateProps => ({
  isSearchFetching: _isSearchFetching(state),
  searchValue: getSearchValue(state)
});

const mapDispatchToProps: ConnectedDispatchProps = {
  editSearch: _editSearch,
  fetchCards: _fetchCards,
  clearSearch: _clearSearch
};

export {Search as Component};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
