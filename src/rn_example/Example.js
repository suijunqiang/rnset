/**
 * Created by SJQ on 20/08/2017.
 */
import React, {Component} from 'react';
import ExampleList from './ExampleList';

import {NavigationPage,TeaNavigator} from 'teaset';


export default class Example extends NavigationPage {
    render() {
        return(
            <ExampleList {...this.props}/>
            //<TeaNavigator rootView={<ExampleList/>} />
        )
    }
}

