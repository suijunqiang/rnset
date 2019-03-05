/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component }       from 'react';
import { ScrollView }             from 'react-native';
import {ListRow,NavigationBar }   from 'teaset';
import ExampleList                from '../ExampleList';
import Frameworks                 from '../Frameworks';
import BasePage                   from '../../components/common/BasePage';
import MessageList                from '../../components/user/message/MessageList';
import H5Game                     from './../web/H5Game';
import H5GameLocal                from './../web/H5GameLocal';
import MultiMedia                 from '../multmedia/index';
import FileManager                from './servers/FileManager';
import GalleryPhotos              from './servers/GallryPhotos';

export default class index extends BasePage{

  renderNavigationBar() {
    return (
        <NavigationBar title={"Web Demo"} 
        />
    );
  }
    getByteValue(){

        parseInt(1234);
    }
  renderPage() {
    return (
        <ScrollView style={{flex: 1}}>
         <ListRow title='File Manager Node Server' detail='Node js' icon={require('../img/icon_tj.png')} onPress={() => this.navigator.push({view: <FileManager/>})}  />
         <ListRow title='Web Gallery Node Server' detail='Node js' icon={require('../img/icon_tj.png')} onPress={() => this.navigator.push({view: <GalleryPhotos/>})}  />
         <ListRow title='File Manager Node Server' detail='Node js' icon={require('../img/icon_tj.png')} onPress={() => this.navigator.push({view: <MessageList />})}  />
         <ListRow title='File Manager Node Server' detail='Node js' icon={require('../img/icon_tj.png')} onPress={() => this.navigator.push({view: <MessageList />})}  />
         <ListRow title='File Manager Node Server' detail='Node js' icon={require('../img/icon_tj.png')} onPress={() => this.navigator.push({view: <MessageList />})}  />
         </ScrollView>
    );
  }
}

