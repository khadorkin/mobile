// @flow

import * as React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import type {Lesson as LessonType} from '../layer/data/_types';
import theme from '../modules/theme';
import withLayout from '../containers/with-layout';
import type {SelectResource} from '../types';
import translations from '../translations';
import type {WithLayoutProps} from '../containers/with-layout';
import Html from './html';
import QuestionTitle from './question-title';
import Resource from './resource';
import ResourcesBrowser from './resources-browser';
import Space from './space';

type Props = {|
  ...WithLayoutProps,
  header: string,
  starsGranted: number,
  resources: Array<LessonType>,
  selectResource: SelectResource,
  onPDFButtonPress: (url: string, description: string) => void
|};

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.spacing.base,
    flexGrow: 1
  },
  scroller: {
    flex: 1
  },
  questionContainer: {
    paddingHorizontal: theme.spacing.xlarge
  },
  bottomTextWrapper: {
    backgroundColor: '#eceff1',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 77
  },
  bottomText: {
    color: theme.colors.gray.dark
  }
});

const Lesson = (props: Props) => {
  const {layout, header, resources, selectResource, starsGranted} = props;

  const selectedResource: LessonType = resources.filter(resource => resource.selected)[0];
  const height = layout && layout.width / (16 / 9);

  if (!height || !selectedResource) {
    return null;
  }

  const winAdditionalStars = translations.winAdditionalStars.replace(
    /{{count}}/g,
    String(starsGranted)
  );

  return (
    <View testID="lesson" style={styles.container}>
      <View style={styles.questionContainer}>
        <QuestionTitle>{header}</QuestionTitle>
      </View>
      <Space type="base" />
      <Resource
        resource={selectedResource}
        height={height}
        onPDFButtonPress={props.onPDFButtonPress}
      />
      <ScrollView
        style={styles.scroller}
        showsHorizontalScrollIndicator={false}
        testID="resources-scroller"
      >
        <ResourcesBrowser resources={resources || []} selectResource={selectResource} />
      </ScrollView>
      <View style={styles.bottomTextWrapper}>
        <Html fontSize={12} style={styles.bottomText}>
          {winAdditionalStars}
        </Html>
      </View>
    </View>
  );
};

export {Lesson as Component};
export default withLayout(Lesson);
