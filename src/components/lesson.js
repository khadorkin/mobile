// @flow

import * as React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import type {Lesson as LessonType} from '../layer/data/_types';
import theme from '../modules/theme';
import withLayout from '../containers/with-layout';
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
  selectedResourceId: string,
  resources: Array<LessonType>,
  onChange: (id: string) => void,
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
    backgroundColor: theme.colors.gray.light,
    width: '100%',
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.xlarge
  },
  bottomText: {
    color: theme.colors.gray.dark,
    textAlign: 'center'
  }
});

const Lesson = (props: Props) => {
  const {layout, header, onChange, resources, selectedResourceId, starsGranted} = props;

  const openedResource: LessonType = resources.filter(
    resource => resource._id === selectedResourceId
  )[0];
  const height = layout && layout.width / (16 / 9);

  if (!height || !selectedResourceId) {
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
        resource={openedResource}
        height={height}
        onPDFButtonPress={props.onPDFButtonPress}
      />
      <ScrollView
        style={styles.scroller}
        showsHorizontalScrollIndicator={false}
        testID="resources-scroller"
      >
        <ResourcesBrowser
          resources={resources}
          onChange={onChange}
          selectedResourceId={selectedResourceId}
        />
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
