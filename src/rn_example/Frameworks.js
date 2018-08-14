/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView} from 'react-native';

import {NavigationBar, ListRow} from 'teaset';
import TeaSet  from './framework/teaSet/TeaSetExa';
import EZSwiper from './at/ezswiper';
import AntMobile from './framework/antMobile/index';
import BasePage from '../components/common/BasePage';

export default class ExampleList extends BasePage{


  renderNavigationBar() {
    return (
        <NavigationBar
            title={"Frameworks"} leftView={ <NavigationBar.BackButton  onPress={() => this.navigator.pop()} />}
        />
    );
  }
  renderPage() {

    return (
        <ScrollView style={{flex: 1}}>
          
          <ListRow title='TeaSet' icon={require('./img/teatset.jpg')}  detail='TeaSetUI' onPress={() => this.navigator.push({view: <TeaSet />})} topSeparator='full' />
          <ListRow title='蚂蚁金融' detail='AntMobile' onPress={() => this.navigator.push({view: <AntMobile/>})}  />
          <ListRow title='EZSwiper' detail='EZSwiper' onPress={() => this.navigator.push({view: <EZSwiper/>})}  />

          </ScrollView>
    );
  }
}

