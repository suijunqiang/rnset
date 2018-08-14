/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component }       from 'react';
import { ScrollView }             from 'react-native';
import {ListRow,NavigationBar }   from 'teaset';
import ExampleList                from './ExampleList';
import Frameworks                 from './Frameworks';
import BasePage                   from '../components/common/BasePage';

export default class index extends BasePage{

  renderNavigationBar() {
    return (
        <NavigationBar title={"例程"} 
                       //leftView={ <NavigationBar.BackButton  onPress={() => this.navigator.pop()}  />}
        />
    );
  }
  renderPage() {
    return (
        <ScrollView style={{flex: 1}}> 
          <ListRow title='常用框架' detail='Framework' icon={require('./img/gonDiIcon.png')} onPress={() => this.navigator.push({view: <Frameworks/>})} topSeparator='full' />
          <ListRow title='设备相关' detail='Devices' icon={require('./img/devices.jpg')} onPress={() => this.navigator.push({view: <ExampleList/>})} topSeparator='full' />
          <ListRow title='深度优化' detail='Optimistic' icon={require('./img/optimistic.jpg')} onPress={() => this.navigator.push({view: <ExampleList/>})} topSeparator='full' />
          <ListRow title='特效相关' detail='Especial' icon={require('./img/special.jpg')} onPress={() => this.navigator.push({view: <ExampleList/>})} topSeparator='full' />
          <ListRow title='游戏相关' detail='Games' icon={require('./img/games.jpg')} onPress={() => this.navigator.push({view: <ExampleList/>})} topSeparator='full' />
        </ScrollView>
    );
  }
}

