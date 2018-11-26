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
  Image,
  Dimensions,
    ScrollView, Switch
} from 'react-native';

import {Theme, NavigationPage, ListRow, NavigationBar, Label} from 'teaset';
import MessageList from '../../components/user/message/MessageList';
import {
    Grayscale,
    Sepia,
    Tint,
    ColorMatrix,
    concatColorMatrices,
    invert,
    RGBA,
    contrast,
    HueRotate,
    saturate
} from 'react-native-color-matrix-image-filters';
export default class ImageFilter extends NavigationPage {


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
          <Grayscale>
            <Image style={styles.icon}  source={require("../../components/user/img/bg.jpg")} />
          </Grayscale>
         <Tint>
            <Image style={styles.icon}  source={require("../../components/user/img/bg.jpg")} />
          </Tint>
         <ColorMatrix matrix={concatColorMatrices([saturate(-0.9), contrast(5.2), invert()])}>
            <Image style={styles.icon}  source={require("../../components/user/img/bg.jpg")} />
          </ColorMatrix>
         <RGBA>
            <Image style={styles.icon}  source={require("../../components/user/img/bg.jpg")} />
          </RGBA>
         <HueRotate>
            <Image style={styles.icon}  source={require("../../components/user/img/bg.jpg")} />
          </HueRotate>

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
  icon: {
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height/5,
    resizeMode:'stretch',
    
  }
});
