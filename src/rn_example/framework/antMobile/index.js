/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView} from 'react-native';

import {NavigationBar, ListRow} from 'teaset';
import { Button } from 'antd-mobile-rn';
import BasePage from '../../../components/common/BasePage';

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

            <Button>Start</Button>
          </ScrollView>
    );
  }
}

