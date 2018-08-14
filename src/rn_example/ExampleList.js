/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    ScrollView, Switch
} from 'react-native';

import {Theme, NavigationPage, ListRow, NavigationBar, Label} from 'teaset';
import Teatest from './framework/teaSet/TeaTest';
import TeaSet  from './framework/teaSet/TeaSetExa';
import MessageList from '../components/user/message/MessageList';
import EZSwiper from './at/ezswiper';
import BasePage from '../components/common/BasePage';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class ExampleList extends NavigationPage {


  renderNavigationBar() {
    return (
        <NavigationBar
            title={"Example"}
            leftView={ <NavigationBar.BackButton  onPress={() => this.navigator.pop()} />}
        />
    );
  }
  renderPage() {

    return (
        <ScrollView style={{flex: 1}}>
          
          <ListRow title='TeaSet' detail='TeaSetUI' onPress={() => this.navigator.push({view: <TeaSet />})} topSeparator='full' />
          <ListRow title='MessageList' detail='消息列表' onPress={() => this.navigator.push({view: <MessageList />})}  />
          <ListRow title='EZSwiper' detail='EZSwiper' onPress={() => this.navigator.push({view: <EZSwiper/>})}  />


          </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
