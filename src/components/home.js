// @flow strict

import * as React from 'react';
import {Image, Animated, Text, TouchableOpacity, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import theme from '../modules/theme';
import defaultAvatar from '../assets/default-avatar.png';

type Props = {||};

type State = {|
  accessToken?: string,
  firstName?: string,
  lastName?: string,
  avatar?: string,
|};

const styles = StyleSheet.create({
  user: {
    alignItems: 'center',
  },
  avatar: {
    borderRadius: theme.spacing.large/2,
    width: theme.spacing.large,
    height: theme.spacing.large,
  },
  name: {
    paddingTop: theme.spacing.tiny,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

class Home extends React.PureComponent<Props, State> {
  state: State = {};

  handleRead = e => {
    this.setState({
      accessToken: e.data,
    }, () => {
      fetch('https://onboarding.coorpacademy.com/api/v1/users/me', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.state.accessToken,
        },
      })
      .then(response =>
        response.headers.get('content-type').includes('application/json')
          ? response.json()
          : undefined)
      .then(({name, avatar}) => this.setState({
        firstName: name.givenName,
        lastName: name.familyName,
        avatar,
      }));
    });
  };

  render() {
    const {accessToken, firstName, lastName, avatar} = this.state;
    const imageSource = avatar && {uri: avatar} || defaultAvatar;

    return (
      <QRCodeScanner
        onRead={this.handleRead}
        topContent={
          <Animated.View style={styles.user}>
            <Image source={imageSource} style={styles.avatar} />
            {firstName && lastName && <Text style={styles.name}>Hello {`${firstName} ${lastName}`}!</Text>}
          </Animated.View>
        }
      />
    );
  }
}

export default Home;
