/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View>
        <Text>Welcome to Venture Hacks!</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('venturehacks', () => App);
