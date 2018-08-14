/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  BackAndroid
} from 'react-native';
import TabNavigator     from 'react-native-tab-navigator';
import TJPage           from './components/common/TJPage';
import My               from './My';
import Example          from './rn_example/index';
import ExampleList      from './rn_example/ExampleList';
import UserCache        from './core/cache/UserCache';
import MessageList      from './components/user/message/MessageList'
import {NavigationPage, TeaNavigator} from 'teaset';

export default class rnset extends NavigationPage {
  constructor(props){
    super(props);

    this.state={
      selectedTab:'首页', 
    }

  }

  willfocus(event){
    let routes = this.props.navigator.getCurrentRoutes();
    let lastRoutes = routes[routes.length-1];

    let currentPage = lastRoutes.component.name;
    if (currentPage==='MainScreen'){
      currentPage=(this.state.selectedTab === 'homePage'?'HomePage':'User');
    }
  }
  didfocus(event){
    let currentPage = event.data.route.component.name;
    if (currentPage==='MainScreen'){
      currentPage=(this.state.selectedTab === 'homePage'?'HomePage':'User');
    }
    console.log('当前所在页面',currentPage);
  }

  componentDidMount(){
    console.log('componentDidMount');
    // BackAndroid.addEventListener('hardwareBackPress', function() {
    //   console.log(this.props.navigator.getCurrentRoutes());
    //   if (this.props.navigator.getCurrentRoutes().length>1) {
    //     this.props.navigator.pop();
    //     return true;
    //   }else{
    //     return false;
    //   }
    //
    // }.bind(this));

    UserCache.initData();
  }



  setHome(uri, title) {
    this.setState({ selectedTab: '首页' })
    this.push(TJPage,{Uri:uri, Title:title});
  }
  render() {
    return (
        <View style={styles.container} >
          <TabNavigator>
            <TabNavigator.Item
                selected={this.state.selectedTab === '首页'}
                title="首页"
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.icon} source={require("./images/tab_home.png")} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={require("./images/tab_home_checked.png")} />}
                //onPress={() =>this.setHome(home_url,home_title)}>
                onPress={() =>this.setState({ selectedTab: '首页' })}>
              <TJPage {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === '功能'}
                title="功能"
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.icon} source={require("./images/tab_demos.png")} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={require("./images/tab_demos_checked.png")} />}
                //onPress={() =>this.setHome(home_url,home_title)}>
               // {/*onPress={() =>this.navigator.push({view: <ExampleList/>})}>*/}
                onPress={() => this.setState({ selectedTab: '功能' })}>
              <Example {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === '我的'}
                title="我的"
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.icon} source={require("./images/tab_user_normal.png")} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={require("./images/tab_user_checked.png")} />}
                onPress={() => this.setState({ selectedTab: '我的' })}>
              <My {...this.props}/>
            </TabNavigator.Item>
          </TabNavigator>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabText: {
    color: "#000000",
    fontSize: 11
  },
  selectedTabText: {
    color: "#999999",
    fontSize: 11
  },
  icon: {
    width: 20,
    height: 20
  }
});

AppRegistry.registerComponent('rnset', () => rnset);
