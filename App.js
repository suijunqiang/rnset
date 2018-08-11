/**
 * reset a react native component set.
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import MainScreen         from './src/MainScreen';
import {TeaNavigator}     from 'teaset';

export default class App extends Component{
  render() {
      return (
          <TeaNavigator rootView={<MainScreen/>} />
      );
  }
}
