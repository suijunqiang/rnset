
import React,{
    Component,
} from 'react'

import {
    StyleSheet,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import CommonStyle from '../CommonStyle'
export default class BScrollableTab extends Component {
    render () {
        return(<DefaultTabBar
                  underlineColor={CommonStyle.color_orange}
                  activeTextColor={CommonStyle.color_orange}
                  inactiveTextColor={CommonStyle.color_gray}
                  textStyle={{marginTop:10,fontSize:CommonStyle.fontSize_14}}
                  style={styles.mainStyle}
                  underlineHeight={2}
                {...this.props}
            />
          )
    }
}
let styles = StyleSheet.create({
    mainStyle:{
        height:40,
        flex:0,
        backgroundColor:'white',
        borderBottomWidth: 0.5,
        borderBottomColor: CommonStyle.color_light_gray,}
});