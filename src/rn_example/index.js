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
import MessageList                from '../components/user/message/MessageList';
import H5Game                     from './web/H5Game';
import H5GameLocal                from './web/H5GameLocal';
import MultiMedia                 from './multmedia/index';
import WebDemos                   from './web/webDemos';
import MqttRN                     from './mqtt/chat/index';``

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
          <ListRow title='功能演示' detail='rnset' icon={require('./img/icon_tj.png')} onPress={() => this.navigator.push({view: <MessageList />})}  /> 
          <ListRow title='常用框架' detail='Framework' icon={require('./img/gonDiIcon.png')} onPress={() => this.navigator.push({view: <Frameworks/>})} topSeparator='full' />
          <ListRow title='设备相关' detail='Devices' icon={require('./img/devices.jpg')} onPress={() => this.navigator.push({view: <ExampleList/>})} topSeparator='full' />
          <ListRow title='深度优化' detail='Optimistic' icon={require('./img/optimistic.jpg')} onPress={() => this.navigator.push({view: <ExampleList/>})} topSeparator='full' />
          <ListRow title='特效相关' detail='Especial' icon={require('./img/special.jpg')} onPress={() => this.navigator.push({view: <ExampleList/>})} topSeparator='full' />
          <ListRow title='多媒体' detail='MultiMedia' icon={require('./img/video.png')} onPress={() => this.navigator.push({view: <MultiMedia/>})} topSeparator='full' />
          <ListRow title='H5游戏在线' detail='Filter' icon={require('./img/games.jpg')} onPress={() => this.navigator.push({view: <H5Game/>})} topSeparator='full' />
          <ListRow title='H5游戏本地' detail='Filter' icon={require('./img/games.jpg')} onPress={() => this.navigator.push({view: <H5GameLocal/>})} topSeparator='full' />
          <ListRow title='Web Demo' detail='Filter' icon={require('./img/games.jpg')} onPress={() => this.navigator.push({view: <WebDemos/>})} topSeparator='full' />
          <ListRow title='MQTTChat' detail='mqtt' icon={require('./img/games.jpg')} onPress={() => this.navigator.push({view: <MqttRN/>})} topSeparator='full' />
        </ScrollView>
    );
  }
}

