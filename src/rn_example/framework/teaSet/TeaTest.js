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

import {Theme, NavigationPage, NavigationBar,ListRow,TeaNavigator} from 'teaset';
import BasePage from '../../../components/common/BasePage';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class TeaTest extends BasePage {


  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Derived page',
  };

  constructor(props) {
    super(props);
    console.log("SJQ: constructor");
    Object.assign(this.state, {
      type: 'iOS',
      title: 'String',
      leftView: 'Back button',
      rightView: 'None',
      bgColor: 'Default',
      tintColor: 'Default',
      hidden: false,
      animated: true,
      statusBarStyle: 'Light Content',
      statusBarHidden: false,
    });

  }

  get type() {
    switch (this.state.type) {
      case 'Auto': return Platform.OS;
      default: return this.state.type.toLowerCase();
    }
  }

  get style() {
    switch (this.state.bgColor) {
      case 'Default': return null;
      case 'Custom': return {backgroundColor: '#e75f35'};
    }
  }

  get tintColor() {
    switch(this.state.tintColor) {
      case 'Default': return null;
      case 'Custom': return '#3af455';
    }
  }

  get statusBarStyle() {
    switch(this.state.statusBarStyle) {
      case 'Default': return 'default';
      case 'Light Content': return 'light-content';
    }

  }

  renderLeftRightView(item) {
    switch (item) {
      case 'None':
        return null;
      case 'Back button':
        return (
            <NavigationBar.BackButton
                title={'    '}
                onPress={() => this.navigator.pop()}
            />
        );
      case 'Link button':
        return (
            <NavigationBar.LinkButton title='Link' />
        );
      case 'Icon button':
        return (
            <NavigationBar.IconButton icon={require('./icons/search.png')} />
        );
      case 'Two icon button':
        return (
            <View style={{flexDirection: 'row'}}>
              <NavigationBar.IconButton icon={require('./icons/edit.png')} />
              <NavigationBar.IconButton icon={require('./icons/trash.png')} />
            </View>
        );
    }
  }

  renderNavigationTitle() {
    let {title} = this.state;
    switch (title) {
      case 'String':
        return this.props.title;
      case 'Custom':
        let titleStyle = {
          flex: 1,
          paddingLeft: 4,
          paddingRight: 4,
          alignItems: this.type === 'ios' ? 'center' : 'flex-start',
        };
        return (
            <View style={titleStyle}>
              <Label style={{color: Theme.navTitleColor, fontSize: 15}} text='Title' />
              <Label style={{color: Theme.navTitleColor, fontSize: 11}}  text='Secondary title' />
            </View>
        );
    }
  }
  renderNavigationLeftView() {
    console.log("SJQ:" + this.state.leftView);
    return this.renderLeftRightView(this.state.leftView);
  }

  renderNavigationRightView() {
    return this.renderLeftRightView(this.state.rightView);
  }

  renderNavigationBar() {
    let {hidden, animated, statusBarHidden} = this.state;
    return (
        <NavigationBar
            style={this.style}
            type={this.type}
            title={this.renderNavigationTitle()}
            leftView={this.renderNavigationLeftView()}
            rightView={this.renderNavigationRightView()}
            tintColor={this.tintColor}
            hidden={hidden}
            animated={animated}
            statusBarStyle={this.statusBarStyle}
            statusBarHidden={statusBarHidden}
        />
    );
  }

  renderPage() {

    return (

        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit App.js
          </Text>
          <Text style={styles.instructions}>
            {instructions}
          </Text>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
