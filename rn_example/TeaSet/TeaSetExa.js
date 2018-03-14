/**
 * Created by SJQ on 20/08/2017.
 */
import React, {Component} from 'react';
import {
    Text,
    Compoment,
} from 'react-native';

import {Theme, NavigationPage, NavigationBar, ListRow} from 'teaset';
import {TeaNavigator} from 'teaset';
import TeasetExampleHome from './views/Home';

export default class TeaSetExa extends NavigationPage {
    render() {
        return(
            <TeaNavigator rootView={<TeasetExampleHome/>} />
        )
    }
}

