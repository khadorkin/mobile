// @flow

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import type {Choice} from '@coorpacademy/progression-engine';

import theme from '../modules/theme';
import {parseTemplate, TEMPLATE_PART_TYPE} from '../modules/template';
import QuestionInput, {ROW_SPACE} from './question-input';
import Text from './text';

type Props = {|
  isDisabled?: boolean,
  template: string,
  items: Array<Choice>,
  userChoices: Array<string>,
  onInputChange: (item: Choice, value: string) => void
|};

const styles = StyleSheet.create({
  template: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    padding: theme.spacing.small,
    paddingBottom: theme.spacing.small + ROW_SPACE,
    paddingHorizontal: theme.spacing.tiny,
    color: theme.colors.black,
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.regular
  }
});

class QuestionTemplate extends React.PureComponent<Props> {
  props: Props;

  handleInputChange = (item: Choice) => (value: string) => this.props.onInputChange(item, value);

  render() {
    const {isDisabled, template, items, userChoices} = this.props;

    if (!template) {
      return null;
    }

    const parts = parseTemplate(template);
    const inputNames = items.map(item => item.name);

    return (
      <View testID="question-template" style={styles.template}>
        {parts.map((part, index) => {
          const testID = `question-part-${index + 1}`;

          if (part.type === TEMPLATE_PART_TYPE.INPUT && inputNames.includes(part.value)) {
            const itemIndex = items.findIndex(_item => _item.name === part.value);
            const item = items[itemIndex];
            const value = userChoices[itemIndex];

            if (!item || !item.type || !item.name) {
              return null;
            }

            return (
              <QuestionInput
                isDisabled={isDisabled}
                type={item.type}
                onChange={this.handleInputChange(item)}
                items={item.items}
                value={value}
                testID={testID}
                key={testID}
              />
            );
          }

          return (
            <Text key={testID} testID={testID} style={styles.text}>
              {part.value}
            </Text>
          );
        })}
      </View>
    );
  }
}

export default QuestionTemplate;
