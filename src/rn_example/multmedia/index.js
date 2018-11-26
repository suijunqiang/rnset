/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView} from 'react-native';

import {NavigationBar, ListRow} from 'teaset';
import Canvas                   from './Canvas';
import BasePage from '../../components/common/BasePage';
import ImageFilter   from '../at/ImageFilter';

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
          
          <ListRow title='Canvas' icon={require('../img/video.png')}  detail='Canvas' onPress={() => this.navigator.push({view: <Canvas/>})} topSeparator='full' />
          <ListRow title='图片滤镜' detail='Filter' icon={require('../img/games.jpg')} onPress={() => this.navigator.push({view: <ImageFilter/>})} topSeparator='full' />

        </ScrollView>
    );
  }
}

