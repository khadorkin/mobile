// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {getContent, fetchContent} from '@coorpacademy/player-store';
import type {Content} from '@coorpacademy/progression-engine';

import CatalogComponent from '../components/catalog';
import type {Item} from '../components/catalog';
import type {Chapter, Discipline} from '../layer/data/_types';
import {getContents, isContentReady} from '../redux/utils/state-extract';
import {CONTENT_TYPE} from '../layer/data/_const';

type ConnectedStateProps = {|
  // items = ready to display
  items: Array<Item>,
  // contents = all refs we want to display, but maybe needing fetch
  ready: Array<Content>
|};

type ConnectedDispatchProps = {|
  fetchContent: typeof fetchContent
|};

type Props = {|
  ...ConnectedStateProps,
  ...ConnectedDispatchProps,
  contents: Array<Content>,
  onDisciplinePress: (discipline: Discipline) => void,
  onChapterPress: (chapter: Chapter) => void
|};

class Catalog extends React.PureComponent<Props> {
  props: Props;

  componentDidMount() {
    this.fetchMissingItems(this.props.contents);
  }

  componentDidUpdate(prevProps: Props) {
    const {contents, items} = this.props;
    const prevContentsRefs = prevProps.contents.map(({ref}) => ref);
    const itemsRefs = items.map(item => item.universalRef);
    const newContentsRefs = contents.filter(
      ({ref}) => !prevContentsRefs.includes(ref) && !itemsRefs.includes(ref)
    );

    if (newContentsRefs) {
      this.fetchMissingItems(newContentsRefs);
    }
  }

  handlePress = (item: Item) => {
    if (this.isChapter(item)) {
      // $FlowFixMe this is a chapter
      const chapter: Chapter = item;
      this.props.onChapterPress(chapter);
    } else {
      // $FlowFixMe this is a discipline
      const discipline: Discipline = item;
      this.props.onDisciplinePress(discipline);
    }
  };

  isChapter = (item: Item): boolean => !item.hasOwnProperty('modules');

  fetchMissingItems = (contents: Array<Content>) =>
    contents.forEach(({type, ref}) => this.props.fetchContent(type, ref));

  render() {
    const {items} = this.props;

    return <CatalogComponent items={items} onPress={this.handlePress} />;
  }
}

const mapStateToProps = ({disciplineBundle, ...state}: StoreState): ConnectedStateProps => {
  const disciplinesRefs: Array<string> = getContents('fr', disciplineBundle.disciplines);
  const chaptersRefs: Array<string> = getContents('fr', disciplineBundle.chapters);
  const disciplinesReady: Array<Content> = disciplinesRefs
    .filter(ref => isContentReady('fr', disciplineBundle.disciplines[ref]))
    .map(ref => ({
      type: CONTENT_TYPE.DISCIPLINE,
      ref
    }));
  const chaptersReady: Array<Content> = chaptersRefs
    .filter(ref => isContentReady('fr', disciplineBundle.chapters[ref]))
    .map(ref => ({
      type: CONTENT_TYPE.CHAPTER,
      ref
    }));
  const contents = disciplinesReady.concat(chaptersReady);
  const items: Array<Item> = contents
    .map(({type, ref}) => getContent(type, ref)(state))
    .filter(item => item);

  return {
    items,
    contents: disciplinesReady.concat(chaptersReady)
  };
};

const mapDispatchToProps: ConnectedDispatchProps = {
  fetchContent
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
