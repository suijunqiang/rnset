import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import ManinScreen from './MainScreen';
import {NavigationPage, TeaNavigator} from 'teaset';
export  class index extends Component {
    constructor(props){
        super(props);

        this.state={
            selectedTab:'首页',
        }

    }

    componentDidMount(){
    }

    render() {
        return (
            <TeaNavigator rootView={<ManinScreen/>} />
        );
    }
}

AppRegistry.registerComponent('SkyBureau', () => index);
