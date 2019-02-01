// @flow

import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import Confetti from 'react-native-confetti-cannon';

import Screen from '../components/screen';
import theme from '../modules/theme';
import {setLivesProgression} from '../redux/actions/progression';

type ConnectedDispatchProps = {|
  setLivesProgression: typeof setLivesProgression
|};

type Props = ReactNavigation$ScreenProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.base,
    justifyContent: 'flex-end'
  }
});

class HomeScreen extends React.PureComponent<Props> {
  props: Props;

  static navigationOptions = ({navigationOptions, navigation}: ReactNavigation$ScreenProps) => ({
    ...navigationOptions,
    headerMode: 'none',
    headerStyle: {
      ...navigationOptions.headerStyle,
      height: 0
    }
  });

  handlePress = (lives?: number) => () => {
    this.props.setLivesProgression(lives);
    this.props.navigation.navigate('Slide');
  };

  render() {
    const {height, width} = Dimensions.get('window');

    return (
      <Screen testID="home-screen" noScroll>
        <View style={styles.container} testID="home">
          <Confetti count={150} origin={{x: width / 2, y: height / 2}} />
        </View>
      </Screen>
    );
  }
}

const mapDispatchToProps: ConnectedDispatchProps = {
  setLivesProgression
};

export default connect(null, mapDispatchToProps)(HomeScreen);
